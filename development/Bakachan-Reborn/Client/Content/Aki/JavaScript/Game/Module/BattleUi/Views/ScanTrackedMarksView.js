"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScanTrackedMarksView = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView"),
	ScanTrackedMarks_1 = require("./ScanTrackedMarks");
class ScanTrackedMarksView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.Sct = new Map()),
			(this.Ect = new Set()),
			(this.yct = (e, t) => {
				if (t && !(t.ScanInfos.length <= 0)) {
					var s = EntitySystem_1.EntitySystem.Get(e);
					if (s) {
						this.Ect.add(e);
						const n = s.GetComponent(1)?.Owner,
							r = t.ScanCompositeConfig.ShowDistance;
						for (const s of t.ScanInfos) {
							const t = s.Color;
							if (0 !== s.IconPath.length) {
								ResourceSystem_1.ResourceSystem.LoadAsync(
									s.IconPath,
									UE.LGUISpriteData_BaseObject,
									(i) => {
										i &&
											i.IsValid() &&
											n &&
											this.Ect.has(e) &&
											this.Ict(
												e,
												i,
												0,
												"",
												void 0,
												n,
												Vector_1.Vector.Create(s.Offset),
												t,
												r,
											);
									},
								);
								break;
							}
						}
					}
				}
			}),
			(this.Tct = (e) => {
				this.Ect.has(e) && this.Ect.delete(e);
				var t = this.Sct.get(e);
				t && (t.ToClose(), this.Sct.delete(e));
			});
	}
	Initialize(e) {
		super.Initialize(e), this.uje();
	}
	Reset() {
		super.Reset(), this.Lct(), this.Sct.clear();
	}
	Update() {
		for (var [, e] of this.Sct) e.Update();
	}
	Ict(e, t, s, n, r, i, c, a, o) {
		this.Sct.has(e) ||
			((t = new ScanTrackedMarks_1.ScanTrackedMarks(
				this.RootItem,
				t,
				s,
				n,
				r,
				i,
				c,
				a,
				o,
			)),
			this.Sct.set(e, t));
	}
	uje() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ScanTrackedStart,
			this.yct,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ScanTrackedEnd,
				this.Tct,
			);
	}
	Lct() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ScanTrackedStart,
			this.yct,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ScanTrackedEnd,
				this.Tct,
			);
	}
	DestroyOverride() {
		return !0;
	}
}
exports.ScanTrackedMarksView = ScanTrackedMarksView;
