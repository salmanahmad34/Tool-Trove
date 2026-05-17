import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Star, Users, ArrowLeft, Shield } from 'lucide-react';

const LIVE_MATCHES_SEED = [
  {
    id: 'm1',
    league: 'UEFA Champions League • Final',
    teamHome: 'Real Madrid',
    teamHomeFlag: '🇪🇸',
    teamAway: 'Manchester City',
    teamAwayFlag: '🇬🇧',
    scoreHome: 2,
    scoreAway: 1,
    minute: 74,
    live: true,
    possessionHome: 46,
    possessionAway: 54,
    shotsHome: 9,
    shotsAway: 12,
    foulsHome: 8,
    foulsAway: 6,
    events: [
      { min: 14, type: 'goal', team: 'away', player: 'Erling Haaland', detail: 'Assist by Kevin De Bruyne' },
      { min: 38, type: 'yellow', team: 'home', player: 'Jude Bellingham', detail: 'Tactical foul' },
      { min: 45, type: 'half', team: 'system', player: 'Halftime whistle', detail: 'Teams head to locker rooms' },
      { min: 61, type: 'goal', team: 'home', player: 'Vinícius Júnior', detail: 'Sensational chip over keeper' },
      { min: 70, type: 'goal', team: 'home', player: 'Kylian Mbappé', detail: 'Volley shot on cross' }
    ]
  },
  {
    id: 'm2',
    league: 'English Premier League',
    teamHome: 'Arsenal',
    teamHomeFlag: '🇬🇧',
    teamAway: 'Chelsea',
    teamAwayFlag: '🇬🇧',
    scoreHome: 0,
    scoreAway: 0,
    minute: 12,
    live: true,
    possessionHome: 60,
    possessionAway: 40,
    shotsHome: 3,
    shotsAway: 1,
    foulsHome: 2,
    foulsAway: 3,
    events: [
      { min: 5, type: 'yellow', team: 'away', player: 'Enzo Fernández', detail: 'Late challenge' }
    ]
  },
  {
    id: 'm3',
    league: 'La Liga Santander',
    teamHome: 'FC Barcelona',
    teamHomeFlag: '🇪🇸',
    teamAway: 'Atletico Madrid',
    teamAwayFlag: '🇪🇸',
    scoreHome: 3,
    scoreAway: 2,
    minute: 90,
    live: false, // Finished match
    possessionHome: 58,
    possessionAway: 42,
    shotsHome: 15,
    shotsAway: 8,
    events: [
      { min: 22, type: 'goal', team: 'home', player: 'Robert Lewandowski', detail: 'Penalty Kick' },
      { min: 44, type: 'goal', team: 'away', player: 'Antoine Griezmann', detail: 'Header from corner' },
      { min: 55, type: 'goal', team: 'home', player: 'Lamine Yamal', detail: 'Curler from outside box' },
      { min: 68, type: 'goal', team: 'away', player: 'Julian Alvarez', detail: 'Rebound tap-in' },
      { min: 89, type: 'goal', team: 'home', player: 'Gavi', detail: 'Screamer from 25 yards' }
    ]
  }
];

export default function SportsTools({ activeTool, onBack }) {
  if (activeTool === 'FIFA Live Tracker' || activeTool === 'Match History' || activeTool === 'Sports Stats') {
    return <FifaLiveTracker onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitat
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">King Lion's Live sports pride</h3>
      <p className="text-slate-500 mb-8">Please choose a tool from the categories above or select one directly.</p>
    </div>
  );
}

// ==================== FIFA LIVE TRACKER ====================
function FifaLiveTracker({ onBack }) {
  const [matches, setMatches] = useState(LIVE_MATCHES_SEED);
  const [selectedMatchId, setSelectedMatchId] = useState('m1');

  // Simulated tick for live minutes and occasional match updates!
  useEffect(() => {
    const timer = setInterval(() => {
      setMatches(prevMatches =>
        prevMatches.map(match => {
          if (!match.live) return match;

          // Tick minute
          let nextMin = match.minute + 1;
          if (nextMin > 90) {
            return { ...match, minute: 90, live: false };
          }

          // Occasional random simulated events (goals!)
          let updatedEvents = [...match.events];
          let homeScore = match.scoreHome;
          let awayScore = match.scoreAway;

          if (Math.random() > 0.94) {
            const side = Math.random() > 0.5 ? 'home' : 'away';
            const scorer = side === 'home' 
              ? (match.teamHome === 'Real Madrid' ? 'Luka Modrić' : 'Bukayo Saka')
              : (match.teamAway === 'Manchester City' ? 'Phil Foden' : 'Cole Palmer');
            
            if (side === 'home') homeScore++; else awayScore++;

            updatedEvents.unshift({
              min: nextMin,
              type: 'goal',
              team: side,
              player: scorer,
              detail: 'Fierce strike following team play combination!'
            });
          }

          return {
            ...match,
            minute: nextMin,
            scoreHome: homeScore,
            scoreAway: awayScore,
            events: updatedEvents
          };
        })
      );
    }, 8000); // speeded up tick (every 8 seconds is 1 soccer minute)

    return () => clearInterval(timer);
  }, []);

  const selectedMatch = matches.find(m => m.id === selectedMatchId) || matches[0];

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-5xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl">
          <Trophy className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Lion's King-Tier FIFA Live Match Tracker</h3>
          <p className="text-sm text-slate-500">Watch simulated live feeds, dynamic events timeline, and live possession stats.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side: Matches List */}
        <div className="space-y-4 lg:col-span-1 border-r border-slate-100 lg:pr-6">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Matches Feed</h4>
          <div className="space-y-3">
            {matches.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMatchId(m.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedMatchId === m.id ? 'bg-yellow-500/10 border-yellow-500 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] font-bold text-slate-400 truncate max-w-[140px]">{m.league}</span>
                  {m.live ? (
                    <span className="px-2 py-0.5 bg-red-500 text-white rounded text-[9px] font-black uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> Live {m.minute}'
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[9px] font-black uppercase">
                      Finished
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <span>{m.teamHomeFlag}</span> {m.teamHome}
                    </span>
                    <span className="font-bold text-slate-900">{m.scoreHome}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <span>{m.teamAwayFlag}</span> {m.teamAway}
                    </span>
                    <span className="font-bold text-slate-900">{m.scoreAway}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Match Detail Arena */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Scoreboard Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block mb-4">
              {selectedMatch.league}
            </span>

            {/* Teams comparison row */}
            <div className="flex justify-around items-center gap-4">
              <div className="flex-1 flex flex-col items-center">
                <span className="text-4xl md:text-5xl mb-2.5">{selectedMatch.teamHomeFlag}</span>
                <span className="font-black text-sm md:text-base leading-tight truncate w-24 md:w-32">{selectedMatch.teamHome}</span>
                <span className="text-xs text-slate-400 font-bold uppercase mt-1">Home</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-4 text-3xl md:text-5xl font-black font-mono">
                  <span>{selectedMatch.scoreHome}</span>
                  <span className="text-slate-600">:</span>
                  <span>{selectedMatch.scoreAway}</span>
                </div>
                {selectedMatch.live ? (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full uppercase">
                    <Clock className="w-3.5 h-3.5" /> Minute {selectedMatch.minute}'
                  </div>
                ) : (
                  <span className="mt-3 px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black rounded-full uppercase">
                    Full Time
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-4xl md:text-5xl mb-2.5">{selectedMatch.teamAwayFlag}</span>
                <span className="font-black text-sm md:text-base leading-tight truncate w-24 md:w-32">{selectedMatch.teamAway}</span>
                <span className="text-xs text-slate-400 font-bold uppercase mt-1">Away</span>
              </div>
            </div>
          </div>

          {/* Stats & Commentaries Tabs Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Possession and general stats */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-5 shadow-inner">
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-yellow-600" /> Live Match Stats
              </h4>
              
              {/* Possession bar */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Ball Possession %</span>
                  <span className="text-slate-800">{selectedMatch.possessionHome}% - {selectedMatch.possessionAway}%</span>
                </div>
                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${selectedMatch.possessionHome}%` }}></div>
                  <div className="bg-slate-400 h-full transition-all duration-500" style={{ width: `${selectedMatch.possessionAway}%` }}></div>
                </div>
              </div>

              {/* Shots progress */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Goal Shots on Target</span>
                  <span className="text-slate-800">{selectedMatch.shotsHome} - {selectedMatch.shotsAway}</span>
                </div>
                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="bg-yellow-500 h-full transition-all"
                    style={{ width: `${(selectedMatch.shotsHome / (selectedMatch.shotsHome + selectedMatch.shotsAway || 1)) * 100}%` }}
                  ></div>
                  <div
                    className="bg-slate-400 h-full transition-all"
                    style={{ width: `${(selectedMatch.shotsAway / (selectedMatch.shotsHome + selectedMatch.shotsAway || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Fouls progress */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Fouls committed</span>
                  <span className="text-slate-800">{selectedMatch.foulsHome} - {selectedMatch.foulsAway}</span>
                </div>
                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="bg-yellow-500 h-full transition-all"
                    style={{ width: `${(selectedMatch.foulsHome / (selectedMatch.foulsHome + selectedMatch.foulsAway || 1)) * 100}%` }}
                  ></div>
                  <div
                    className="bg-slate-400 h-full transition-all"
                    style={{ width: `${(selectedMatch.foulsAway / (selectedMatch.foulsHome + selectedMatch.foulsAway || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Match Event Timeline list */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-inner">
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-600" /> Match Events Arena
              </h4>
              
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {selectedMatch.events.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs font-semibold">
                    Whistle blown. Match kicks off soon!
                  </div>
                ) : (
                  selectedMatch.events.map((ev, i) => (
                    <div key={i} className="flex gap-3 text-xs leading-normal items-start">
                      <span className="w-8 py-0.5 bg-yellow-500/10 text-yellow-700 rounded text-center font-bold shrink-0">
                        {ev.min}'
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          {ev.type === 'goal' && '⚽ GOAL!'}
                          {ev.type === 'yellow' && '🟨 Yellow Card'}
                          {ev.type === 'half' && '⏱️ Halftime'}
                          <span className="font-black text-slate-900">{ev.player}</span>
                        </div>
                        <p className="text-slate-400">{ev.detail}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
