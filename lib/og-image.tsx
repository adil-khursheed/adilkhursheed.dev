import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} — ${site.role}`;

const ink = "#151b23";
const paper = "#ffffff";
const azure = "#1d9bf0";
const hairline = "#e3e8e7";
const muted = "#667085";
const body = "#475467";

type Assets = {
  outfit400: Buffer;
  outfit500: Buffer;
  outfit600: Buffer;
  mono400: Buffer;
  portrait: string;
};

let assetsPromise: Promise<Assets> | null = null;

function loadAssets() {
  assetsPromise ??= Promise.all([
    readFile(join(process.cwd(), "public/fonts/outfit-400.woff")),
    readFile(join(process.cwd(), "public/fonts/outfit-500.woff")),
    readFile(join(process.cwd(), "public/fonts/outfit-600.woff")),
    readFile(join(process.cwd(), "public/fonts/ibm-plex-mono-400.ttf")),
    readFile(join(process.cwd(), "public/portrait/adil-khursheed.png")),
  ]).then(([outfit400, outfit500, outfit600, mono400, portrait]) => ({
    outfit400,
    outfit500,
    outfit600,
    mono400,
    portrait: `data:image/png;base64,${portrait.toString("base64")}`,
  }));

  return assetsPromise;
}

export async function renderSocialImage() {
  const assets = await loadAssets();
  const host = new URL(site.url).host.replace(/^www\./, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: paper,
          color: ink,
          padding: "44px 64px 38px",
          fontFamily: "Outfit",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 24,
            width: 14,
            display: "flex",
            borderLeft: `1px solid ${hairline}`,
            borderRight: `1px solid ${hairline}`,
            backgroundImage: `repeating-linear-gradient(315deg, ${hairline} 0px, ${hairline} 1px, transparent 1px, transparent 10px)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 24,
            width: 14,
            display: "flex",
            borderLeft: `1px solid ${hairline}`,
            borderRight: `1px solid ${hairline}`,
            backgroundImage: `repeating-linear-gradient(315deg, ${hairline} 0px, ${hairline} 1px, transparent 1px, transparent 10px)`,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 20,
            borderBottom: `1px solid ${hairline}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.portrait}
              alt=""
              width={44}
              height={44}
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                objectFit: "cover",
                border: `1px solid ${hairline}`,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 14,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {site.name}
              </span>
              <span
                style={{
                  fontFamily: "IBM Plex Mono",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: muted,
                  marginTop: 4,
                }}
              >
                portfolio / 2026
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "IBM Plex Mono",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: muted,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 6,
                height: 6,
                borderRadius: 999,
                backgroundColor: azure,
                marginRight: 9,
              }}
            />
            <span>available for work</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 660,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "IBM Plex Mono",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: azure,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  backgroundColor: azure,
                  marginRight: 10,
                }}
              />
              <span>full stack web developer</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
              }}
            >
              <span
                style={{
                  fontSize: 92,
                  fontWeight: 600,
                  lineHeight: 0.94,
                  letterSpacing: "-5px",
                }}
              >
                Adil
              </span>
              <span
                style={{
                  fontSize: 92,
                  fontWeight: 600,
                  lineHeight: 0.94,
                  letterSpacing: "-5px",
                }}
              >
                Khursheed
              </span>
            </div>

            <div
              style={{
                display: "flex",
                width: 56,
                height: 3,
                borderRadius: 2,
                backgroundColor: azure,
                marginTop: 24,
                marginBottom: 18,
              }}
            />

            <div
              style={{
                display: "flex",
                width: 560,
                fontSize: 22,
                lineHeight: 1.45,
                color: body,
              }}
            >
              I turn ideas into fast, scalable, real-world products — from the
              first sketch to the last deploy.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontFamily: "IBM Plex Mono",
                fontSize: 11,
                letterSpacing: "0.05em",
                color: muted,
                textTransform: "lowercase",
              }}
            >
              typescript · react · next.js · node.js · mongodb
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 330,
              marginLeft: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 330,
                height: 340,
                borderRadius: 28,
                overflow: "hidden",
                border: `1px solid ${hairline}`,
                backgroundColor: "#f3f5f4",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.portrait}
                alt={`Portrait of ${site.name}`}
                width={330}
                height={340}
                style={{
                  width: 330,
                  height: 340,
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
                fontFamily: "IBM Plex Mono",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "lowercase",
                color: muted,
              }}
            >
              <span>portrait</span>
              <span>01 / 01</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 16,
            borderTop: `1px solid ${hairline}`,
            fontFamily: "IBM Plex Mono",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "lowercase",
            color: muted,
          }}
        >
          <span>{host}</span>
          <span>based in india</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Outfit",
          data: assets.outfit400,
          weight: 400,
          style: "normal",
        },
        {
          name: "Outfit",
          data: assets.outfit500,
          weight: 500,
          style: "normal",
        },
        {
          name: "Outfit",
          data: assets.outfit600,
          weight: 600,
          style: "normal",
        },
        {
          name: "IBM Plex Mono",
          data: assets.mono400,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
