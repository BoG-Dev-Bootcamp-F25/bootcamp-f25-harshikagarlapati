import React, { useEffect, useState } from "react";
import "./App.css";

const TYPE_COLORS = {
  normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
  grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
  ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
  steel: "#B7B7CE", fairy: "#D685AD",
};

function TypeBadge({ type }) {
  const t = type?.type?.name || type;
  return (
    <span className="type-badge" style={{ backgroundColor: TYPE_COLORS[t] || "#bbb" }}>
      {t}
    </span>
  );
}

function StatLine({ label, value }) {
  return (
    <div className="stat-line">
      <span className="stat-label">{label}:</span> <span>{value}</span>
    </div>
  );
}

export default function App() {
  const [dexId, setDexId] = useState(132); // start on Ditto
  const [view, setView] = useState("info"); // "info" | "moves"
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStatus("loading");
        const id = Math.max(1, dexId);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!res.ok) throw new Error(`No Pokémon found for id=${id}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setStatus("idle");
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(e.message || "Failed to fetch Pokémon.");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [dexId]);

  const dec = () => setDexId(n => Math.max(1, n - 1));
  const inc = () => setDexId(n => n + 1);

  const name = data?.name ?? "";
  const sprite =
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    data?.sprites?.front_default ||
    "";
  const types = data?.types ?? [];
  const moves = data?.moves ?? [];
  const stats = data?.stats ?? [];

  const heightM = data ? (data.height ?? 0) / 10 : 0;
  const weightKg = data ? (data.weight ?? 0) / 10 : 0;

  return (
    <div className="page">
      <h1 className="title">Exercise 5 - PokeDex!</h1>

      <div className="layout">
        {/* LEFT COLUMN */}
        <div>
          <div className="sprite-box">
            {status === "loading" && <div className="center">Loading…</div>}
            {status === "error" && <div className="center">⚠ {errorMsg}</div>}
            {status === "idle" && sprite && (
              <img className="sprite" src={sprite} alt={name} />
            )}
          </div>

          <div className="name-pill">{name ? capitalize(name) : "—"}</div>

          <div className="types-block">
            <div className="types-label"><strong>Types:</strong></div>
            <div className="types-row">
              {types.map(t => <TypeBadge key={t.slot} type={t} />)}
            </div>
          </div>

          <div className="arrows">
            <button className="arrow-btn" onClick={dec} aria-label="Previous">
              <span className="chev">‹</span>
            </button>
            <button className="arrow-btn" onClick={inc} aria-label="Next">
              <span className="chev">›</span>
            </button>
          </div>
        </div>

  
        <div>
          <div className="panel-header">Info</div>
          <div className="info-panel">
            {view === "info" ? (
              <div>
                <StatLine label="height" value={`${heightM.toFixed(1)}m`} />
                <StatLine label="weight" value={`${weightKg.toFixed(1)}kg`} />
                {stats.map(s => (
                  <StatLine
                    key={s.stat.name}
                    label={s.stat.name}
                    value={s.base_stat}
                  />
                ))}
              </div>
            ) : (
              <div className="moves-wrap">
                {moves.map(m => (
                  <div key={m.move.name} className="move-line">
                    {titleCase(m.move.name)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="toggle-row">
            <button
              className={`toggle-btn ${view === "info" ? "active" : ""}`}
              onClick={() => setView("info")}
            >
              Info
            </button>
            <button
              className={`toggle-btn ${view === "moves" ? "active" : ""}`}
              onClick={() => setView("moves")}
            >
              Moves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function capitalize(s) { return s ? s[0].toUpperCase() + s.slice(1) : ""; }
function titleCase(str) {
  return str.split("-").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
}
