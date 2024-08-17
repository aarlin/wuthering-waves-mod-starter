"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiChildViewData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	VisibleStateUtil_1 = require("./VisibleStateUtil");
class BattleUiChildViewData {
	constructor() {
		(this.lKe = []), (this._Ke = new Map());
	}
	Init() {
		for (let e = (this.lKe.length = 0); e < 23; e++) this.lKe.push(1);
		this.lKe.push(0);
	}
	OnLeaveLevel() {}
	Clear() {}
	GetChildVisible(e) {
		return 0 === this.lKe[e];
	}
	SetChildVisible(e, t, i, l = !0) {
		var s = this.lKe[t];
		i = VisibleStateUtil_1.VisibleStateUtil.SetVisible(s, i, e);
		return (
			(this.lKe[t] = i),
			!l || s === i || (0 !== s && 0 !== i) || this.uKe(t),
			0 === i
		);
	}
	SetChildrenVisible(e, t, i, l = !0) {
		for (const s of t) this.SetChildVisible(e, s, i, l);
	}
	HideBattleView(e, t) {
		for (let t = 0; t < 24; t++) this.SetChildVisible(e, t, !1, !1);
		if (t) for (const i of t) this.SetChildVisible(e, i, !0, !1);
		this.cKe();
	}
	ShowBattleView(e) {
		for (let t = 0; t < 24; t++) this.SetChildVisible(e, t, !0, !1);
		this.cKe();
	}
	AddCallback(e, t) {
		let i = this._Ke.get(e);
		i || ((i = []), this._Ke.set(e, i)), i.push(t);
	}
	RemoveCallback(e, t) {
		(e = this._Ke.get(e)) && -1 !== (t = e.indexOf(t)) && e.splice(t, 1);
	}
	uKe(e) {
		if ((e = this._Ke.get(e))) for (const t of e) t();
	}
	cKe() {
		try {
			for (const e of this._Ke.values()) for (const t of e) t();
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack("Battle", 18, "childViewError", e, [
						"",
						e.message,
					])
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "childViewError", ["error", e]);
		}
	}
	DebugLogAllChildState() {
		for (let e = 0; e < 25; e++)
			if (0 !== this.lKe[e])
				for (let t = 0; t < 12; t++)
					VisibleStateUtil_1.VisibleStateUtil.GetVisibleByType(
						this.lKe[e],
						t,
					) ||
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Battle",
								18,
								"界面被隐藏",
								["编号", e],
								["原因", t],
							));
	}
}
exports.BattleUiChildViewData = BattleUiChildViewData;
