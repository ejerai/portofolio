"use client";

import { useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ACCESS_KEY = "2b9c970c-dce7-4673-a4aa-0e42232ae0cf";

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

function NameIcon() {
  return (
    <svg className="kontak-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g>
        <path d="M98.80039,256.86631c-.97137-1.16611-2.19075-2.16707-3.51485-2.16707s-2.54349,1.001-3.51485,2.16707a4.53642,4.53642,0,0,0,.3,6.103h.00006a4.54643,4.54643,0,0,0,6.42959,0h.00006A4.53642,4.53642,0,0,0,98.80039,256.86631Z" transform="translate(-83.28549 -252.69924)"></path>
        <rect x="2" y="15.30177" width="20" height="6.69823" rx="3.34911"></rect>
      </g>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="kontak-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform="translate(2.45208, 2.85198)">
        <path d="M15.0928322,6.167017 C15.0928322,6.167017 11.8828071,10.0196486 9.53493746,10.0196486 C7.18807029,10.0196486 3.941955,6.167017 3.941955,6.167017"></path>
        <path d="M0,9.11679198 C0,2.27869674 2.38095238,0 9.52380952,0 C16.6666667,0 19.047619,2.27869674 19.047619,9.11679198 C19.047619,15.9538847 16.6666667,18.233584 9.52380952,18.233584 C2.38095238,18.233584 0,15.9538847 0,9.11679198 Z"></path>
      </g>
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg className="kontak-icon kontak-icon--top" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform="translate(2, 2)">
        <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413"></line>
        <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413"></line>
        <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413"></line>
        <path d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"></path>
      </g>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<{ text: string; kind: "error" | "success" | null }>({
    text: "",
    kind: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    setStatus({ text: "", kind: null });

    if (!name || !email || !message) {
      setStatus({ text: "Mohon isi semua kolom sebelum mengirim pesan.", kind: "error" });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ text: "Format email tidak valid.", kind: "error" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Pesan baru dari Portfolio — ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const data = (await res.json()) as Web3FormsResponse;
      if (!data.success) throw new Error(data.message || "Gagal mengirim");

      setStatus({ text: "Pesan terkirim! Terima kasih, akan aku balas secepatnya.", kind: "success" });
      form.reset();
    } catch {
      setStatus({
        text: "Gagal mengirim otomatis. Silakan email langsung ke ezrarahmadityaa@gmail.com.",
        kind: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="kontak-card reveal reveal-up" style={{ ["--reveal-delay" as string]: "0.2s" }}>
      <div className="kontak-card-head">
        <h3 className="about-title">
          Kontak<span className="kontak-dot">.</span>
        </h3>
      </div>

      <form className="kontak-form" id="kontakForm" noValidate ref={formRef} onSubmit={handleSubmit}>
        <div className="kontak-field kontak-field--icon">
          <NameIcon />
          <label className="kontak-label-sr" htmlFor="kontakName">
            Nama
          </label>
          <input className="kontak-input" id="kontakName" name="name" type="text" placeholder="nama" required autoComplete="name" />
        </div>

        <div className="kontak-field kontak-field--icon">
          <EmailIcon />
          <label className="kontak-label-sr" htmlFor="kontakEmail">
            Email
          </label>
          <input className="kontak-input" id="kontakEmail" name="email" type="email" placeholder="nama@email.com" required autoComplete="email" />
        </div>

        <div className="kontak-field kontak-field--icon kontak-field--textarea">
          <MessageIcon />
          <label className="kontak-label-sr" htmlFor="kontakMsg">
            Pesan
          </label>
          <textarea className="kontak-input kontak-textarea" id="kontakMsg" name="message" placeholder="surat cinta..." required rows={2}></textarea>
        </div>

        <div className="kontak-form-foot">
          <p className={`kontak-status${status.kind ? ` is-${status.kind}` : ""}`} id="kontakStatus" role="status" aria-live="polite">
            {status.text}
          </p>
          <button type="submit" className="kontak-submit" id="kontakSubmit" disabled={submitting}>
            <span>{submitting ? "Mengirim..." : "Kirim Pesan"}</span>
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
