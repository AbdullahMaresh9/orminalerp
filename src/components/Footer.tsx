import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';

function Social({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-brand-500"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

const socials = {
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21h-4V9Z',
  x: 'M17.53 3H21l-7.19 8.21L21.5 21h-6.3l-4.6-6.02L5.2 21H2l7.5-8.57L2.2 3h6.3l4.28 5.66L17.53 3Z',
  facebook:
    'M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.44.36-.8.5-.8Z',
  whatsapp: 'M19.24 12.22c-.03-.15-.94-1.52-3.25-3.78-.51-.45-1.12-.68-1.82-.68-.69 0-1.31.23-1.82.68l-.7.63-.7-.63c-.51-.45-1.12-.68-1.82-.68s-1.31.23-1.82.68L5.05 8.46c-2.31 2.26-3.22 3.63-3.25 3.78-.03.15.08 1.3.94 2.45.76 1.03 1.8 1.92 3.12 2.68l.2.12.13.09.1.06.16.11.28.21.29.21.35.25.13.1.16.09.17.08h.17l.18.07.19.06.2.04h.23c.12.02.26.03.4.03.15 0 .29-.01.44-.03h.23l.2-.04.19-.06.17-.08.16-.09.13-.1.35-.25.29-.21.28-.21.16-.11.1-.06.13-.09.12-.06.18-.07.17-.08.16-.09.13-.1c.02-.06.14-.18.25-.34l.28-.35c1.31-.77 2.35-1.65 3.12-2.68.86-1.15.97-2.3.94-2.45ZM12.3 18.93c-1.33.79-2.57 1.33-3.71 1.58l-.22.04-.14-.08-.34-.25-.28-.21-.16-.11-.13-.1-.34-.25c-1.31-.75-2.35-1.64-3.12-2.69-.85-1.14-.96-2.29-.93-2.43l.03-.13.12-.19.2-.17c1.33-.8 2.57-1.32 3.71-1.56l.22-.04.14.08.34.25.28.21.16.11.13.1.34.25c1.31.76 2.35 1.64 3.12 2.69.84 1.15.96 2.29.93 2.44l-.03.13-.12.19-.2.17c-.43.22-.93.37-1.52.56Zm6.27-.84c-.25.31-.77.74-1.47 1.07l-.13.06.16.11.28.21.29.21.35.25.13.1.17.09.18.07.19.06.2.04h.23c.12.02.26.03.4.03.15 0 .29-.01.44-.03h.23l-.2-.04-.19-.06-.17-.08-.16-.09-.13-.1c-.39-.27-.77-.57-1.14-.89-.06-.05-.11-.09-.16-.14Zm-12.58-.84c-.25.31-.77.74-1.47 1.07l-.13.06.16.11.28.21.29.21.35.25.13.1.17.09.18.07.19.06.2.04h.23c.12.02.26.03.4.03.15 0 .29-.01.44-.03h.23l-.2-.04-.19-.06-.17-.08-.16-.09-.13-.1c-.39-.27-.77-.57-1.14-.89l-.13-.12Z',
};

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const home = `/${locale}`;

  const productLinks = [
    { href: `${home}#features`, label: dict.nav.features },
    { href: `${home}#pricing`, label: dict.nav.pricing },
    { href: `${home}/pricing/configure`, label: dict.configurator.title },
    { href: `${home}#knowledge`, label: dict.nav.knowledge },
  ];

  const companyLinks = [
    { href: `${home}#about`, label: dict.nav.about },
    { href: `${home}#partners`, label: dict.nav.partners },
    { href: `${home}/partners/login`, label: dict.partners.login },
    { href: `${home}/terms`, label: dict.footer.terms },
  ];

  return (
    <footer className="border-t border-white/10 bg-brand-950 text-white">
      <div className="container-page grid gap-10 py-14 sm:gap-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5 md:col-span-2 lg:col-span-1">
          <Logo locale={locale} variant="inverse" />
          <p className="max-w-sm text-sm leading-relaxed text-white/70">{dict.footer.about}</p>
          <div className="flex items-center gap-2">
            <Social href="https://www.linkedin.com/in/orminalerp" label="LinkedIn" path={socials.linkedin} />
            <Social href="https://x.com" label="X" path={socials.x} />
            <Social href="https://www.facebook.com" label="Facebook" path={socials.facebook} />
            <Social href="https://wa.me/967737719291" label="Whatsapp" path={socials.whatsapp} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">{dict.footer.links}</h3>
          <ul className="space-y-3 text-sm text-white/70">
            {productLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-sky2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">{dict.footer.company}</h3>
          <ul className="space-y-3 text-sm text-white/70">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-sky2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">
              {dict.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky2" />
                <a href="mailto:orminalerp@gmail.com" className="transition hover:text-sky2">
                  orminalerp@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2" dir={'dir'}>
                <Phone className="h-4 w-4 text-sky2" />
                <a href="tel:+967737719291" className="transition hover:text-sky2">
                  +967 737 719 291
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky2" />
                {dict.contact.address}
              </li>
            </ul>
          </div>
          <NewsletterForm
            labels={{
              title: dict.footer.newsletter,
              body: dict.footer.newsletterBody,
              placeholder: dict.contact.email,
              submit: dict.footer.subscribe,
              done: dict.footer.subscribed,
            }}
          />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {year} Orminal ERP — {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link href={`${home}/terms`} className="transition hover:text-sky2">
              {dict.footer.terms}
            </Link>
            <span aria-hidden>•</span>
            <span>
              {dict.footer.poweredBy} <span className="font-semibold text-sky2">Orminal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
