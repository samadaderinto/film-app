import { EmojiStyle } from "emoji-picker-react";
import { User } from "../types/user";
import { iOS } from "../utils/iOS";

/**
 * Represents a default user object.
 */
export const defaultUser: User = {
  name : "",
  email: null,
  createdAt: new Date(),
  profilePicture: null,
  emojisStyle: iOS ? EmojiStyle.NATIVE : EmojiStyle.APPLE,
  tasks: [],
  theme: "system",
  password: "",
  settings: [
    {
      enableCategories: true,
      doneToBottom: false,
      enableGlow: true,
      enableReadAloud: "speechSynthesis" in window,
      voice: "Google UK English Male",
      voiceVolume: 0.6,
    },
  ],
  categories: [
    { id: 1, name: "Drama", emoji: "1f3e0", color: "#1fff44" },
    { id: 2, name: "Action", emoji: "1f3e2", color: "#248eff" },
    { id: 3, name: "Horror", emoji: "1f464", color: "#e843fe" },
    { id: 4, name: "Romance", emoji: "1f4aa", color: "#ffdf3d" },
    { id: 5, name: "Comedy", emoji: "1f4da", color: "#ff8e24" },
    { id: 6, name: "Fantasy", emoji: "1f4da", color: "#ff8e24" },
    { id: 7, name: "Musical", emoji: "1f4da", color: "#ff8e24" },
  ],
};
