export interface Game {
  name: string;
  isSpaceAge: boolean;
  panelId: string;
}

// TODO: make these dynamic based on storage
export const games: Game[] = [
  {
    name: "Game 1",
    isSpaceAge: true,
    panelId: "1570443206221365300",
  },
  {
    name: "Game 2",
    isSpaceAge: false,
    panelId: "1570443301759221761",
  },
];
