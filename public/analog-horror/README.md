# NIGHT SHIFT — Spectre Cleaning Solutions // Tape №4

A self-contained analog-horror browser game. You're the night cleaner at
Spectre's Site B, watching six CCTV feeds from midnight to 6 AM. When a room
is *wrong* — a figure, a moved object, an open door, dead lights — file an
incident report before the fault escalates.

## Play

- Deployed: visit `/analog-horror/` on the site.
- Local: open `index.html` directly in any browser. No build, no dependencies,
  no assets — visuals are canvas-drawn and all audio is procedural WebAudio.

## Controls

| Key | Action |
| --- | --- |
| `1–6` / `←` `→` | Switch camera |
| `R` | Open the incident report panel |
| `Enter` / `Esc` | Submit / cancel a report |

## Rules

- Faults escalate in stages roughly every 15–26 s. Any fault reaching stage 3
  ends the tape.
- A false report locks the panel for 5 seconds.
- Survive to 6:00 AM to clock out. Headphones recommended.
