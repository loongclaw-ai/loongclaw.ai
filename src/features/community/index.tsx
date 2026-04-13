import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { getCommunityIndex } from "../../utils/content-loader";
import { Github, MessageCircle, Send, Ghost, Camera, MessagesSquare, Bird, Twitter } from "lucide-react";
import SeoHead from "../../components/seo/SeoHead";
import { getCommunitySeo } from "../../seo/metadata";

const getIcon = (type: string) => {
  switch (type) {
    case 'github': return Github;
    case 'x': return Twitter;
    case 'discord': return MessageCircle;
    case 'telegram': return Send;
    case 'reddit': return Ghost;
    case 'xiaohongshu': return Camera;
    case 'wechat': return MessagesSquare;
    case 'feishu': return Bird;
    default: return Github;
  }
};

const CommunityPage: FC = () => {
  const { t, i18n } = useTranslation();
  const { resources } = getCommunityIndex();
  const seo = getCommunitySeo(t, i18n.language);

  return (
    <>
      <SeoHead {...seo} />
      <div
        style={{
          padding: "4rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "var(--color-text-primary)",
          }}
        >
          {t("community_page.title")}
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "3rem",
            maxWidth: "600px",
            fontSize: "1.1rem",
          }}
        >
          {t("community_page.subtitle")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {resources.map((resource) => {
            const Icon = getIcon(resource.type || '');
            return (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: "1px solid var(--color-border)",
                  padding: "2rem",
                  borderRadius: "8px",
                  background: "var(--color-bg-secondary)",
                  transition: "all var(--transition-base)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.background = "var(--color-bg-tertiary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "var(--color-bg-secondary)";
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={24} style={{ color: 'var(--color-text-primary)' }} />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      margin: 0,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {t(`community_page.resources.${resource.type || resource.title.toLowerCase()}.title`, { defaultValue: resource.title })}
                  </h3>
                </div>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {t(`community_page.resources.${resource.type || resource.title.toLowerCase()}.description`, { defaultValue: resource.description })}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
