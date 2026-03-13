import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import FormData from "form-data";
import multer from "multer";
import fs from "fs";
const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({ dest: "uploads/" });
// ─── In-memory user store (replace with a real DB) ───────────────────────────
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || "change_me_in_production";
const SONIX_API_KEY = process.env.SONIX_API_KEY;
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
// ─── Auth middleware ──────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Missing token" });
        return;
    }
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid token" });
    }
}
// ─── POST /signup ─────────────────────────────────────────────────────────────
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: "name, email, and password are required" });
        return;
    }
    if (users.find((u) => u.email === email)) {
        res.status(409).json({ error: "Email already registered" });
        return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ name, email, passwordHash });
    const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Account created", token });
});
// ─── POST /signin ─────────────────────────────────────────────────────────────
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "email and password are required" });
        return;
    }
    const user = users.find((u) => u.email === email);
    if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, {
        expiresIn: "7d",
    });
    res.json({ message: "Signed in", token });
});
// ─── POST /speech-to-text ─────────────────────────────────────────────────────
// Expects multipart/form-data with field "audio" (audio file)
// Optional field "language" (e.g. "as" for Assamese, "en" for English)
app.post("/speech-to-text", authMiddleware, upload.single("audio"), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No audio file provided" });
        return;
    }
    const language = req.body.language || "as";
    try {
        // Step 1: Submit audio to Sonix for transcription
        const form = new FormData();
        form.append("file", fs.createReadStream(req.file.path), {
            filename: req.file.originalname || "audio.wav",
            contentType: req.file.mimetype,
        });
        form.append("language", language);
        form.append("name", `transcription_${Date.now()}`);
        const submitRes = await axios.post("https://api.sonix.ai/v1/media", form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${SONIX_API_KEY}`,
            },
        });
        const mediaId = submitRes.data.id;
        // Step 2: Poll until transcription is complete
        let transcript = "";
        for (let i = 0; i < 30; i++) {
            await new Promise((r) => setTimeout(r, 5000)); // wait 5 s
            const statusRes = await axios.get(`https://api.sonix.ai/v1/media/${mediaId}`, { headers: { Authorization: `Bearer ${SONIX_API_KEY}` } });
            if (statusRes.data.status === "completed") {
                // Fetch the plain-text transcript
                const textRes = await axios.get(`https://api.sonix.ai/v1/media/${mediaId}/transcript`, {
                    headers: {
                        Authorization: `Bearer ${SONIX_API_KEY}`,
                        Accept: "text/plain",
                    },
                });
                transcript = textRes.data;
                break;
            }
            if (statusRes.data.status === "failed") {
                throw new Error("Sonix transcription failed");
            }
        }
        if (!transcript) {
            res.status(504).json({ error: "Transcription timed out" });
            return;
        }
        res.json({ transcript });
    }
    catch (err) {
        console.error(err?.response?.data || err.message);
        res.status(500).json({ error: "Speech-to-text failed" });
    }
    finally {
        fs.unlink(req.file.path, () => { }); // clean up temp file
    }
});
// ─── Shared Google Translate helper ──────────────────────────────────────────
async function googleTranslate(text, source, target) {
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, {}, {
        params: {
            q: text,
            source,
            target,
            format: "text",
            key: GOOGLE_TRANSLATE_API_KEY,
        },
    });
    return response.data.data.translations[0].translatedText;
}
// ─── POST /convert-to-english ─────────────────────────────────────────────────
// Body: { text: string }
app.post("/convert-to-english", authMiddleware, async (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: "text is required" });
        return;
    }
    try {
        const translated = await googleTranslate(text, "as", "en");
        res.json({ translated });
    }
    catch (err) {
        console.error(err?.response?.data || err.message);
        res.status(500).json({ error: "Translation to English failed" });
    }
});
// ─── POST /convert-to-assamese ────────────────────────────────────────────────
// Body: { text: string }
app.post("/convert-to-assamese", authMiddleware, async (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: "text is required" });
        return;
    }
    try {
        const translated = await googleTranslate(text, "en", "as");
        res.json({ translated });
    }
    catch (err) {
        console.error(err?.response?.data || err.message);
        res.status(500).json({ error: "Translation to Assamese failed" });
    }
});
// ─── POST /text-to-speech ─────────────────────────────────────────────────────
// Body: { text: string, language?: string, voice_id?: string }
// Returns: audio file (MP3) streamed directly back
app.post("/text-to-speech", authMiddleware, async (req, res) => {
    const { text, language = "en", voice_id } = req.body;
    if (!text) {
        res.status(400).json({ error: "text is required" });
        return;
    }
    try {
        // Sonix TTS endpoint
        const payload = { text, language };
        if (voice_id)
            payload.voice_id = voice_id;
        const ttsRes = await axios.post("https://api.sonix.ai/v1/text_to_speech", payload, {
            headers: {
                Authorization: `Bearer ${SONIX_API_KEY}`,
                "Content-Type": "application/json",
            },
            responseType: "stream",
        });
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Disposition", "attachment; filename=speech.mp3");
        ttsRes.data.pipe(res);
    }
    catch (err) {
        console.error(err?.response?.data || err.message);
        res.status(500).json({ error: "Text-to-speech failed" });
    }
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
//# sourceMappingURL=index.js.map