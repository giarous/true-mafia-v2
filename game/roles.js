const images = {
  Citizen: require('../resources/citizen.png'),
  Mafia: require('../resources/mafia.png'),
  Don: require('../resources/don.png'),
  Sheriff: require('../resources/sheriff_2.png'),
};

export const fallbackRoleImage = require('../resources/true_story.jpg');
const isKnownRole = role => Object.prototype.hasOwnProperty.call(images, role);
export const getRoleImage = role =>
  isKnownRole(role) ? images[role] : fallbackRoleImage;

/** Investigations reveal alignment: the Don is shown as Mafia, not as Don. */
export function getInvestigationRole(role) {
  if (role === 'Don') {
    return 'Mafia';
  }
  return isKnownRole(role) ? role : 'Default';
}
