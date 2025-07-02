// Build compression utilities for URL sharing
// This handles encoding/decoding build data to create shareable URLs

export interface BuildData {
  stats: {
    vitality: number;
    attunement: number;
    endurance: number;
    strength: number;
    dexterity: number;
    resistance: number;
    intelligence: number;
    faith: number;
  };
  equipment: {
    weapons: string[];
    shields: string[];
    sorceries: string[];
    miracles: string[];
    armor: string[];
    rings: string[];
  };
  settings: {
    isTwoHanded: boolean;
  };
}

export const buildCompression = {
  // Encode build data to compact format
  encode: (buildData: BuildData): string => {
    const compact = {
      s: {
        // stats
        v: buildData.stats.vitality,
        a: buildData.stats.attunement,
        e: buildData.stats.endurance,
        st: buildData.stats.strength,
        d: buildData.stats.dexterity,
        r: buildData.stats.resistance,
        i: buildData.stats.intelligence,
        f: buildData.stats.faith,
      },
      e: {
        // equipment - use full names for now
        w: buildData.equipment.weapons,
        sh: buildData.equipment.shields,
        so: buildData.equipment.sorceries,
        m: buildData.equipment.miracles,
        ar: buildData.equipment.armor,
        ri: buildData.equipment.rings,
      },
      t: buildData.settings.isTwoHanded,
    };

    // Convert to JSON and encode
    const json = JSON.stringify(compact);
    return btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  },

  // Decode compact format back to build data
  decode: (encoded: string): BuildData | null => {
    try {
      // Restore base64 padding
      const padded = encoded + "=".repeat((4 - (encoded.length % 4)) % 4);
      const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
      const json = atob(base64);
      const compact = JSON.parse(json);

      // Convert back to full format
      return {
        stats: {
          vitality: compact.s.v,
          attunement: compact.s.a,
          endurance: compact.s.e,
          strength: compact.s.st,
          dexterity: compact.s.d,
          resistance: compact.s.r,
          intelligence: compact.s.i,
          faith: compact.s.f,
        },
        equipment: {
          weapons: compact.e.w,
          shields: compact.e.sh,
          sorceries: compact.e.so,
          miracles: compact.e.m,
          armor: compact.e.ar,
          rings: compact.e.ri,
        },
        settings: {
          isTwoHanded: compact.t,
        },
      };
    } catch (error) {
      console.error("Failed to decode build data:", error);
      return null;
    }
  },

  // Generate shareable URL
  generateUrl: (buildData: BuildData): string => {
    const encoded = buildCompression.encode(buildData);
    return `${window.location.origin}/tools/ds1/starting-class-optimizer?b=${encoded}`;
  },
};
