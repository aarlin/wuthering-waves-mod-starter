"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguePokemon = void 0);
class RoguePokemon {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PhantomItem() {
		return this.phantomitem();
	}
	get Quality() {
		return this.quality();
	}
	get PokemonIcon() {
		return this.pokemonicon();
	}
	get PokemonName() {
		return this.pokemonname();
	}
	get PokemonSettleIcon() {
		return this.pokemonsettleicon();
	}
	get PokemonSkillDesc() {
		return this.pokemonskilldesc();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRoguePokemon(t, e) {
		return (e || new RoguePokemon()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantomitem() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	quality() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	pokemonicon(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	pokemonname(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	pokemonsettleicon(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	pokemonskilldesc(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.RoguePokemon = RoguePokemon;
//# sourceMappingURL=RoguePokemon.js.map
