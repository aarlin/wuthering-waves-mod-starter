"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestNodeData = void 0);
class QuestNodeData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Key() {
		return this.key();
	}
	get Data() {
		return this.data();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsQuestNodeData(t, s) {
		return (s || new QuestNodeData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	data(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.QuestNodeData = QuestNodeData;
//# sourceMappingURL=QuestNodeData.js.map
