const zulrah = {
	drops: {
		uniques: [
			{
				uncutOnyx: '<:Uncut_onyx:403059676402679808>',
				magicFang: '<:Magic_fang:403059673563004928>',
				serpentineVisage: '<:Serpentine_visage:403059676016672769>',
				tanzaniteFang: '<:Tanzanite_fang:403059675979055105>'
			}
		],
		mutagens: {
			magmaMutagen: '<:Magma_mutagen:403059676733898753>',
			tanzaniteMutagen: '<:Tanzanite_mutagen:403059676306079746>'
		},
		pet: '<:Pet_snakeling:324127377816944642>',
		jarOfSwamp: '<:Jar_of_swamp:403059673588170776>'
	},
	nameMap: {
		uncutOnyx: 'Uncut onyx',
		magicFang: 'Magic fang',
		serpentineVisage: 'Serpentine visage',
		tanzaniteFang: 'Tanzanite fang',
		magmaMutagen: 'Magma mutagen',
		tanzaniteMutagen: 'Tanzanite mutagen',
		pet: 'Pet snakeling',
		jarOfSwamp: 'Jar of swamp'
	},
	// prices as of 2019/07/15
	priceMap: {
		uncutOnyx: 2820000,
		magicFang: 3333000,
		serpentineVisage: 3330000,
		tanzaniteFang: 3345000,
		magmaMutagen: 0,
		tanzaniteMutagen: 0,
		pet: 0,
		jarOfSwamp: 12500
	},
	randomUnique() {
		const keys = Object.keys(this.drops.uniques[0]);
		const randomKey = keys[Math.floor(Math.random() * keys.length)];
		return this.drops.uniques[0][randomKey];
	},
	randomMutagen() {
		const keys = Object.keys(this.drops.mutagens);
		const randomKey = keys[Math.floor(Math.random() * keys.length)];
		return this.drops.mutagens[randomKey];
	},
	kill(quantity) {
		if (quantity <= 500) {
			return this.smallKill(quantity);
		} else {
			return this.bigKill(quantity);
		}
	},

	smallKill(quantity) {
		const loot = [];
		for (let i = 0; i < quantity; i++) {
			if (this.roll(4000)) loot.push(this.drops.pet);
			if (this.roll(3277)) loot.push(this.randomMutagen());
			if (this.roll(3000)) loot.push(this.drops.jarOfSwamp);
			if (this.roll(128)) loot.push(this.randomUnique());
		}
		return loot.join(' ');
	},

	bigKill(quantity) {
		const loot = {
			uncutOnyx: 0,
			magicFang: 0,
			serpentineVisage: 0,
			tanzaniteFang: 0,
			magmaMutagen: 0,
			tanzaniteMutagen: 0,
			pet: 0,
			jarOfSwamp: 0
		};
		const displayLoot = [];
		let totalValue = 0;

		for (let i = 0; i < quantity; i++) {
			if (this.roll(512)) loot.uncutOnyx++;
			if (this.roll(512)) loot.magicFang++;
			if (this.roll(512)) loot.serpentineVisage++;
			if (this.roll(512)) loot.tanzaniteFang++;
			if (this.roll(6579)) loot.magmaMutagen++;
			if (this.roll(6579)) loot.tanzaniteMutagen++;
			if (this.roll(5000)) loot.pet++;
			if (this.roll(3000)) loot.jarOfSwamp++;
		}

		for (const key in loot) {
			displayLoot.push(`**${this.nameMap[key]}**: ${loot[key].toLocaleString()} `);
			totalValue += this.priceMap[key] * loot[key];
		}
		displayLoot.push(`\n**Total Value:** ${totalValue.toLocaleString()} GP`);
		displayLoot.push(`**GP per Kill:** ${Math.round(totalValue / quantity).toLocaleString()} GP`);
		return displayLoot.join('\n');
	},

	roll(max) {
		return Math.floor(Math.random() * max + 1) === 1;
	}
};

module.exports = zulrah;
