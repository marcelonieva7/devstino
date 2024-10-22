const ROUTES = {
  ADD: {
    STEP_ONE: "/crear/primer-paso",
    STEP_TWO: "/crear/segundo-paso",
    STEP_THREE: "/crear/tercer-paso",
    REVIEW: "/crear/revisar",
  },
  HOME: "/",
  DEVSTINO: "/tu-devstino",
} as const

const COLLECTIONS_ID = {
  TECHNOLOGIES: "670c66aa00118ca160ee",
  EVIL_DEVS: "670c5497001f7c584380",
  DESTINATIONS: "670c53a0001461364b12"
} as const

export { ROUTES, COLLECTIONS_ID }