"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorHintView = exports.initFavorExpItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	RoleFavorHintItem_1 = require("./RoleFavorHintItem"),
	initFavorExpItem = (e, t, i) => ({
		Key: i,
		Value: new RoleFavorHintItem_1.RoleFavorHintItem(e, t),
	});
exports.initFavorExpItem = initFavorExpItem;
class RoleFavorHintView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.O1o = []),
			(this.k1o = void 0),
			(this.F1o = 0),
			(this.V1o = (e) => {
				var t,
					i = this.H1o(e),
					o = i.length;
				for (let e = 0; e < o; e++) {
					var r = i[e];
					this.O1o.push(r);
				}
				for ([, t] of (this.k1o.ClearChildren(),
				this.k1o.RebuildLayoutByDataNew(this.O1o),
				(this.F1o = this.O1o.length),
				this.k1o.GetLayoutItemMap()))
					t.SetSequenceFinishCallBack(this.q1o);
			}),
			(this.q1o = () => {
				(this.F1o = this.F1o - 1),
					0 === this.F1o &&
						UiManager_1.UiManager.CloseView("RoleFavorHintView");
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
		];
	}
	OnStart() {
		for (var [, e] of ((this.O1o = this.OpenParam),
		(this.O1o = this.H1o(this.O1o)),
		(this.k1o = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(1),
			exports.initFavorExpItem,
		)),
		this.k1o.RebuildLayoutByDataNew(this.O1o),
		(this.F1o = this.O1o.length),
		this.k1o.GetLayoutItemMap()))
			e.SetSequenceFinishCallBack(this.q1o);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateRoleFavorHintView,
			this.V1o,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateRoleFavorHintView,
			this.V1o,
		);
	}
	H1o(e) {
		if (
			ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
		) {
			var t =
				ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
					.GetRoleIdList;
			if (0 !== t.length) {
				const h = t.length;
				var i = new Set();
				let l,
					v = 0,
					u = !0;
				for (let n = 0; n < h; n++) {
					var o = t[n],
						r = e.length;
					let s = !1;
					for (let t = 0; t < r; t++) {
						var a = e[t];
						if (a.RoleConfig.Id === o) {
							0 === v ? ((v = a.Exp), (s = !0), (l = a)) : (s = a.Exp === v),
								i.add(t);
							break;
						}
					}
					s || (u = !1);
				}
				if (u) {
					const t = e.length;
					var n,
						s = [];
					s.push(l);
					for (let o = 0; o < t; o++) i.has(o) || ((n = e[o]), s.push(n));
					return s;
				}
			}
		}
		return e;
	}
	OnBeforeDestroy() {
		(this.O1o = []),
			this.k1o && (this.k1o.ClearChildren(), (this.k1o = void 0)),
			(this.F1o = 0);
	}
}
exports.RoleFavorHintView = RoleFavorHintView;
