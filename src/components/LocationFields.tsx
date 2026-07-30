import { useState, useMemo } from 'react';
import { MapPin, LocateFixed, ChevronDown } from 'lucide-react';

const COUNTRIES = [
  'Afghanistan','Argentina','Australia','Austria','Bangladesh','Belgium','Brazil','Bulgaria','Cambodia','Cameroon','Canada','Chad','Chile','China','Colombia','Congo (DRC)','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Dominican Republic','Ecuador','Egypt','El Salvador','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Guatemala','Guinea','Haiti','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kuwait','Latvia','Lebanon','Liberia','Libya','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Mali','Malta','Mexico','Moldova','Mongolia','Morocco','Mozambique','Myanmar','Namibia','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Macedonia','Norway','Oman','Pakistan','Panama','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saudi Arabia','Senegal','Serbia','Sierra Leone','Singapore','Slovakia','Slovenia','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Togo','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

export interface LocationData {
  country: string;
  city_region: string;
}

interface Props {
  value: LocationData;
  onChange: (val: LocationData) => void;
  showGeolocate?: boolean;
}

export default function LocationFields({ value, onChange, showGeolocate = true }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  const filtered = useMemo(() => {
    if (!query) return COUNTRIES;
    const q = query.toLowerCase();
    return COUNTRIES.filter(c => c.toLowerCase().includes(q));
  }, [query]);

  function selectCountry(c: string) {
    onChange({ ...value, country: c });
    setOpen(false);
    setQuery('');
  }

  async function detectLocation() {
    setGeoLoading(true);
    setGeoError('');
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not available in this browser.');
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=5&addressdetails=1`,
            { headers: { 'Accept': 'application/json' } }
          );
          if (!res.ok) throw new Error('Lookup failed');
          const data = await res.json();
          const addr = data.address || {};
          const country = addr.country || '';
          const city = addr.city || addr.town || addr.village || addr.county || addr.state || addr.region || '';
          onChange({ country, city_region: city });
        } catch {
          setGeoError('Could not detect your location. Please select manually.');
        } finally {
          setGeoLoading(false);
        }
      },
      () => {
        setGeoError('Location permission denied. Please select manually.');
        setGeoLoading(false);
      },
      { timeout: 8000 }
    );
  }

  const inputCls = "w-full px-5 py-3.5 rounded-xl ih-input text-white placeholder-white/35 transition-colors text-sm";

  return (
    <>
      {/* Country dropdown */}
      <div className="relative">
        <label className="block text-[0.72rem] font-semibold text-white/50 mb-1.5 tracking-wider uppercase">Country *</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={inputCls + ' flex items-center justify-between text-left' + (value.country ? '' : ' text-white/35')}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="flex items-center gap-2 truncate">
              <MapPin size={14} className="text-gold-400 shrink-0" aria-hidden="true" />
              {value.country || 'Select your country'}
            </span>
            <ChevronDown size={15} className={`text-white/40 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {open && (
            <div className="absolute z-50 mt-1.5 w-full rounded-xl bg-[#0B1220] border border-gold-400/30 shadow-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Search countries…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border-b border-white/10 text-white placeholder-white/35 text-sm focus:outline-none"
                autoFocus
              />
              <ul className="max-h-56 overflow-y-auto" role="listbox">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-white/40 text-sm">No countries found.</li>
                ) : (
                  filtered.map(c => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => selectCountry(c)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gold-400/10 ${value.country === c ? 'text-gold-300 bg-gold-400/10 font-semibold' : 'text-white/70'}`}
                        role="option"
                        aria-selected={value.country === c}
                      >
                        {c}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* City / Region */}
      <div>
        <label className="block text-[0.72rem] font-semibold text-white/50 mb-1.5 tracking-wider uppercase">City / State / County <span className="text-white/30 normal-case">(recommended)</span></label>
        <input
          type="text"
          placeholder="Your city or region"
          value={value.city_region}
          onChange={e => onChange({ ...value, city_region: e.target.value })}
          className={inputCls}
          aria-label="City, state, or county"
        />
      </div>

      {/* Geolocate button */}
      {showGeolocate && (
        <div>
          <button
            type="button"
            onClick={detectLocation}
            disabled={geoLoading}
            className="inline-flex items-center gap-2 text-xs text-gold-300 hover:text-gold-200 transition-colors disabled:opacity-50"
          >
            <LocateFixed size={13} className={geoLoading ? 'animate-spin' : ''} aria-hidden="true" />
            {geoLoading ? 'Detecting…' : 'Detect my location'}
          </button>
          {geoError && <p className="text-red-400 text-xs mt-1">{geoError}</p>}
        </div>
      )}
    </>
  );
}
