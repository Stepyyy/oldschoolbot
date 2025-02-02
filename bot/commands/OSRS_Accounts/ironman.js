const { Command } = require('klasa');
const osrs = require('osrs-wrapper');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 2,
			aliases: ['iron', 'im'],
			description: 'Shows the stats of an Ironman account.',
			usage: '(username:rsn)',
			requiredPermissions: ['EMBED_LINKS']
		});
	}
	async run(msg, [username]) {
		const player = await osrs.hiscores.getPlayer(username, 'Ironman').catch(() => {
			throw this.client.notFound;
		});

		const embed = await this.getStatsEmbed(username, 5460819, player);

		return msg.send({ embed });
	}

};
