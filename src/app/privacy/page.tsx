import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  UserCheck,
  Calendar,
  AlertTriangle,
  FileText,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | DPDP Act 2023 Compliant | Bangalore Real Estate',
  description:
    'Comprehensive Privacy Policy compliant with India Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'March 15, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Statutory Legal Disclaimer Banner */}
        <div className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-amber-950 block">
              DRAFT POLICY NOTICE — MANDATORY LEGAL REVIEW REQUIRED BEFORE LAUNCH
            </strong>
            <p>
              This Privacy Policy is prepared in accordance with the{' '}
              <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the{' '}
              <strong>Information Technology Act, 2000</strong>. We are committed to transparency, data minimisation, and safeguarding your personal information.
            </p>
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Digital Personal Data Protection Act, 2023 (DPDP Act) Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Privacy Policy & Data Notice
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Effective Date: {lastUpdated}
            </span>
            <span>•</span>
            <span>Jurisdiction: Bangalore, Karnataka, India</span>
            <span>•</span>
            <span>Version: v1.0-2026-03</span>
          </div>
        </div>



        {/* Policy Body Content */}
        <article className="prose prose-slate max-w-none space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1: Data Fiduciary */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              Data Fiduciary Details
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023, the Data Fiduciary responsible for processing your personal data on this platform is:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
              <div><strong>Entity:</strong> [BUSINESS_NAME_PLACEHOLDER]</div>
              <div><strong>Registered Address:</strong> [BUSINESS_ADDRESS_PLACEHOLDER], Bangalore, Karnataka, India – 560001</div>
              <div><strong>Corporate Email:</strong> legal@[BUSINESS_DOMAIN_PLACEHOLDER].in</div>
              <div><strong>Karnataka RERA Agency Registration:</strong> [AGENCY_KRERA_REG_NO_PLACEHOLDER]</div>
            </div>
          </section>

          {/* Section 2: Data Minimisation & What We Collect */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              Data Minimisation & What We Collect
            </h2>
            <p>
              We adhere strictly to the principle of <strong>data minimisation</strong> under Section 6 of the DPDP Act. We only collect information strictly necessary to facilitate your Bangalore property enquiry or arrange an inspection:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Full Name:</strong> To address you during property consultations.</li>
              <li><strong>Indian Mobile Number:</strong> To connect you with our verified Bangalore advisory desk or coordinate site visits.</li>
              <li><strong>Optional Email Address:</strong> Used solely to transmit brochures, unit plans, and verified pricing sheets if you provide it.</li>
              <li><strong>Preferred Bangalore Corridor & Budget:</strong> (e.g. Whitefield, Sarjapur Road, ₹1.5 Cr–₹2.5 Cr) to provide relevant inventory.</li>
              <li><strong>Inspection Date & Slot:</strong> For scheduling verified property site visits.</li>
              <li><strong>Consent Audit Metadata:</strong> Salted SHA-256 hash of your IP address, timestamp, page URL, and notice text version.</li>
            </ul>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1 mt-3">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Strict Prohibition on High-Risk Financial & Identity Data</span>
              </div>
              <p className="text-xs">
                We <strong>NEVER</strong> collect, request, or store your <strong>Aadhaar Number, PAN Card, Bank Account Details, Credit/Debit Card credentials, UPI PINs, or Biometric information</strong> anywhere on this website. Any request purporting to be from us asking for such details is fraudulent.
              </p>
            </div>
          </section>

          {/* Section 3: Purpose Limitation */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              Purpose Limitation (DPDP Act § 6)
            </h2>
            <p>
              Your personal data is used solely and exclusively for the specific purpose for which you granted unbundled consent:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
              <li>Responding to your specific property enquiry on the selected Bangalore project.</li>
              <li>Arranging and confirming verified on-site visits and gate clearance with the developer sales pavilion.</li>
              <li>Addressing customer grievance redressal requests under Section 13 of the Act.</li>
            </ol>
            <p className="font-semibold text-slate-900">
              We do NOT sell, license, rent, or trade your contact details with external third-party telemarketers, credit card issuers, or personal loan brokers.
            </p>
          </section>

          {/* Section 4: Data Encryption & Security */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">4</span>
              Security & Field-Level Encryption at Rest
            </h2>
            <p>
              Under Section 8 of the DPDP Act and the Information Technology (Reasonable Security Practices) Rules, 2011, we implement technical and organizational security controls:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Field-Level Encryption at Rest:</strong> Mobile numbers and email addresses are encrypted in our database using <strong>AES-256-GCM</strong> authenticated encryption.</li>
              <li><strong>Zero Plaintext IP Logging:</strong> IP addresses are converted into salted SHA-256 hashes immediately upon request receipt and never stored in plain text.</li>
              <li><strong>Transit Encryption:</strong> Enforced HTTPS with HTTP Strict Transport Security (HSTS) with 1-year max-age.</li>
              <li><strong>Admin Access Security:</strong> Restricted access with bcrypt password hashing, Mandatory Time-based One-Time Password (TOTP) 2FA, and an immutable admin audit log.</li>
            </ul>
          </section>

          {/* Section 5: Third Parties & Disclosures */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">5</span>
              Third-Party Data Processors & Disclosures
            </h2>
            <p>
              To deliver our services, we engage specific Data Processors bound by contractual confidentiality and statutory compliance:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Processor / Tool</th>
                    <th className="p-3 border-b border-slate-200">Role / Purpose</th>
                    <th className="p-3 border-b border-slate-200">Data Processed</th>
                    <th className="p-3 border-b border-slate-200">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold">Verified Developer Desk</td>
                    <td className="p-3">On-site coordination for user-requested site visits</td>
                    <td className="p-3">Name, Phone (for gate pass only)</td>
                    <td className="p-3">Bangalore, India</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">WhatsApp Cloud API (Meta)</td>
                    <td className="p-3">Direct messaging upon user opt-in</td>
                    <td className="p-3">Mobile number</td>
                    <td className="p-3">Global (E2E Encrypted)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Self-Hosted Analytics (Umami / Plausible)</td>
                    <td className="p-3">Privacy analytics without cookies or IP tracking</td>
                    <td className="p-3">Aggregate page counts</td>
                    <td className="p-3">Self-hosted / India</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Cloud Infrastructure (Coolify / Docker)</td>
                    <td className="p-3">Application hosting and database container</td>
                    <td className="p-3">Encrypted database backups</td>
                    <td className="p-3">India / Mumbai Region</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Data Retention & Auto-Deletion */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">6</span>
              Retention Policy & Auto-Deletion
            </h2>
            <p>
              In accordance with Section 8(7) of the DPDP Act:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Lead records are retained for a <strong>maximum period of 12 months</strong> following the date of last customer activity.</li>
              <li>Upon the lapse of 12 months without active engagement, records are automatically erased or irreversibly anonymized.</li>
              <li>Consent logs are retained as required by law for statutory compliance defense, containing only hashed identifiers.</li>
            </ul>
          </section>

          {/* Section 7: Rights of Data Principals */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">7</span>
              Your Statutory Rights (DPDP Act §§ 11, 12, 13, 14)
            </h2>
            <p>As a Data Principal in India, you hold enforceable legal rights:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong>Right to Access (§ 11):</strong> Request a summary of personal data being processed and identities of parties shared with.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong>Right to Correction (§ 12):</strong> Request correction of inaccurate, misleading, or outdated contact details.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong>Right to Erasure (§ 12):</strong> Request complete deletion of your personal data from active databases and backups.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <strong>Right to Withdraw Consent (§ 6):</strong> Withdraw your consent at any time as easily as giving it, without penalty.
              </div>
            </div>
            <p className="pt-2">
              To exercise any of these options or request information, contact our{' '}
              <Link href="/contact" className="text-emerald-700 font-bold underline">
                Support & Privacy Desk
              </Link>{' '}
              directly.
            </p>
          </section>

          {/* Section 8: Protection of Children */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">8</span>
              Protection of Children (DPDP Act § 9)
            </h2>
            <p>
              This website is intended exclusively for individuals aged <strong>18 years or older</strong> who possess the legal capacity to contract under the Indian Contract Act, 1872. We do not knowingly collect personal data from minors. If you believe a minor has submitted information, please notify our team at contact@vasatiproperties.com for immediate erasure.
            </p>
          </section>

          {/* Section 9: Data Breach Response Readiness */}
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">9</span>
              Data Breach Response Readiness (DPDP Act § 8(6))
            </h2>
            <p>
              In the event of an authenticated personal data breach impacting confidentiality or integrity:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Our security incident response team will contain the vulnerability within technical containment SLAs.</li>
              <li>We will notify the <strong>Data Protection Board of India (DPBI)</strong> in the prescribed form and manner.</li>
              <li>We will notify all affected Data Principals with recommended remedial actions without undue delay.</li>
            </ul>
          </section>

          {/* Section 10: Privacy & Customer Support Desk */}
          <section className="space-y-4 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">10</span>
              Privacy & Customer Support Desk
            </h2>
            <p>
              In accordance with the DPDP Act, 2023, any inquiry, complaint, or request regarding personal data handling should be directed to our dedicated team:
            </p>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-2">
              <div><strong>Desk:</strong> Vasati Properties Privacy & Customer Advisory</div>
              <div><strong>Location:</strong> Level 4, Prestige Meridian, MG Road / ORR Corridor, Bangalore – 560001</div>
              <div>
                <strong>Direct Email:</strong>{' '}
                <a href="mailto:contact@vasatiproperties.com" className="text-emerald-700 font-bold underline">
                  contact@vasatiproperties.com
                </a>
              </div>
              <div><strong>Direct Phone:</strong> +91 98765 43210</div>
              <div className="pt-2 text-slate-500 border-t border-slate-100">
                <strong>Response Timeline:</strong> Acknowledgement within <strong>24 hours</strong>; resolution within <strong>7 working days</strong>.
              </div>
            </div>
          </section>
        </article>

        {/* Bottom Link Back to Home */}
        <div className="text-center pt-4">
          <Link href="/" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition">
            ← Return to Bangalore Property Inventory
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

