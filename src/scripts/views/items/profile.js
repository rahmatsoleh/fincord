import { createAvatar } from '@dicebear/avatars';
import * as avatarStyle from '@dicebear/pixel-art';

const getProfileByName = (name) => createAvatar(avatarStyle, {
  seed: name,
  size: 70,
  radius: 70,
});

export default getProfileByName;
