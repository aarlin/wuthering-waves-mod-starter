"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TutorialDefine_1 = require("./TutorialDefine");
class TutorialModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.RewardInfo = void 0),
			(this.NDo = new Map()),
			(this.ODo = new Map());
	}
	OnInit() {
		for (const e in TutorialDefine_1.ETutorialType) {
			var t = Number(e);
			isNaN(t) || this.NDo.set(t, new Map());
		}
		return !0;
	}
	InitTutorialTotalData() {
		for (const o of Array.from(this.ODo.values())) {
			var t = new TutorialDefine_1.TutorialSaveData(),
				e =
					((t.TimeStamp = o.TimeStamp),
					(t.TutorialId = o.TutorialId),
					(t.HasRedDot = o.HasRedDot),
					t.TutorialData.TutorialType),
				a = t.TutorialData.Id;
			this.NDo.get(e).set(a, t),
				this.NDo.get(TutorialDefine_1.ETutorialType.All).set(a, t),
				this.ODo.set(a, t);
		}
	}
	OnClear() {
		for (const t of this.NDo.values()) t.clear();
		return this.NDo.clear(), !0;
	}
	InitUnlockTutorials(t) {
		for (const o of t) {
			var e = new TutorialDefine_1.TutorialSaveData(),
				a =
					((e.TimeStamp = o.BRs),
					(e.TutorialId = o.Ekn),
					(e.HasRedDot = !o._bs),
					e.TutorialData.TutorialType);
			Object.values(TutorialDefine_1.ETutorialType).includes(a) &&
				(this.NDo.get(a).has(e.TutorialId) ||
					(this.NDo.get(a).set(e.TutorialId, e), this.ODo.set(e.TutorialId, e)),
				this.InvokeTutorialRedDot(e));
		}
	}
	UpdateUnlockTutorials(t) {
		var e = new TutorialDefine_1.TutorialSaveData();
		(e.TimeStamp = t.BRs),
			(e.TutorialId = t.Ekn),
			(e.HasRedDot = !t._bs),
			(t = e.TutorialData.TutorialType);
		Object.values(TutorialDefine_1.ETutorialType).includes(t) &&
			!this.NDo.get(t).has(e.TutorialId) &&
			(this.NDo.get(t).set(e.TutorialId, e),
			this.NDo.get(TutorialDefine_1.ETutorialType.All).set(e.TutorialId, e),
			this.ODo.set(e.TutorialId, e),
			this.InvokeUpdateTutorials(),
			this.InvokeTutorialRedDot(e));
	}
	GetUnlockedTutorialDataByType(t) {
		var e,
			a,
			o = [];
		for (const e of this.NDo.get(t).values()) {
			var i = {
				IsTypeTitle: !1,
				TextId: e.TutorialData.GroupName,
				SavedData: e,
				OwnerType: t,
			};
			e.HasRedDot && this.InvokeTutorialRedDot(e), o.push(i);
		}
		if (
			(o.sort((e, a) => {
				var o, i;
				return e.SavedData.HasRedDot && !a.SavedData.HasRedDot
					? -1
					: !e.SavedData.HasRedDot && a.SavedData.HasRedDot
						? 1
						: (e.SavedData.HasRedDot && a.SavedData.HasRedDot) ||
								t === TutorialDefine_1.ETutorialType.All
							? a.SavedData.TimeStamp - e.SavedData.TimeStamp
							: ((o = e.SavedData.TutorialData),
								(i = a.SavedData.TutorialData),
								e.SavedData.TimeStamp !== a.SavedData.TimeStamp
									? e.SavedData.TimeStamp - a.SavedData.TimeStamp
									: o.TutorialOrder !== i.TutorialOrder
										? o.TutorialOrder - i.TutorialOrder
										: o.Id - i.Id);
			}),
			t !== TutorialDefine_1.ETutorialType.All)
		)
			return o;
		let r = o.length;
		for ([e, a] of o.entries())
			if (!a.SavedData.HasRedDot) {
				r = e + TutorialDefine_1.TutorialUtils.MaxLatestTutorial;
				break;
			}
		return o.slice(0, r);
	}
	RemoveRedDotTutorialId(t) {
		this.ODo.has(t) &&
			(((t = this.ODo.get(t)).HasRedDot = !1), this.InvokeTutorialRedDot(t));
	}
	RedDotCheckIsNewTutorial(t) {
		return this.ODo.get(t)?.HasRedDot ?? !1;
	}
	InvokeUpdateTutorials() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTutorialUpdate);
	}
	InvokeTutorialRedDot(t) {
		var e = t ? t.TutorialId : 0;
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RedDotNewTutorial,
			e,
		),
			t &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RedDotNewTutorialType,
					TutorialDefine_1.ETutorialType.All,
				);
	}
	RedDotCheckIsNewTutorialType(t) {
		if (this.NDo.has(t))
			for (const e of this.NDo.get(t).values()) if (e.HasRedDot) return !0;
		return !1;
	}
	MakeSearchList(t, e) {
		let a;
		var o = [];
		try {
			a = new RegExp(t, "i");
		} catch (t) {
			return { ItemData: o, HasTutorial: !1 };
		}
		let i = !1;
		for (const s of Array.from(this.NDo.keys()).sort((t) => (t === e ? -1 : 1)))
			if (s !== TutorialDefine_1.ETutorialType.All) {
				var r = [];
				for (const e of this.NDo.get(s).values()) {
					var l = e.GetTutorialTitle();
					l.search(a) < 0 ||
						((l = {
							IsTypeTitle: !1,
							TextId: e.TutorialData.GroupName,
							SavedData: e,
							Text: l.replace(
								t,
								TutorialDefine_1.TutorialUtils.AddSearchHighlight(t),
							),
						}),
						(i = !0),
						r.push(l));
				}
				e === TutorialDefine_1.ETutorialType.All
					? o.push(...r)
					: r.length &&
						(o.push({
							IsTypeTitle: !0,
							TextId: TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(s),
						}),
						o.push(...r));
			}
		return { ItemData: o, HasTutorial: i };
	}
	GetSavedDataById(t) {
		return this.ODo.get(t);
	}
}
exports.TutorialModel = TutorialModel;
