"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterCursorHandle = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CampUtils_1 = require("../../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
	MonsterCursorUnit_1 = require("../HudUnit/MonsterCursorUnit"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class MonsterCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.Uoi = []),
			(this.Poi = new Map()),
			(this.xoi = new Set()),
			(this.woi = new Map()),
			(this.Boi = 0),
			(this.boi = 0),
			(this.qoi = void 0),
			(this.CurrentEntity = void 0),
			(this.coi = void 0),
			(this.o9e = void 0),
			(this.r9e = !1),
			(this.Goi = new Set()),
			(this.Noi = 0),
			(this.Ooi = 0),
			(this.koi = 0),
			(this.Foi = 0),
			(this.Voi = 0),
			(this.doi = void 0),
			(this.GUe = (t, i, e) => {
				this.Hoi(i.Entity) && (this.joi(i.Entity), this.Woi());
			}),
			(this.zpe = (t, i) => {
				var e;
				this.Hoi(i.Entity) &&
					((e = this.HudEntitySet.GetByEntity(i.Entity)) &&
						(this.Koi(e), this.Qoi(i.Entity)),
					this.HudEntitySet.Num() <= 0) &&
					this.Xoi();
			}),
			(this.o7e = (t, i) => {
				(this.CurrentEntity = t),
					(this.coi = this.CurrentEntity.Entity.GetComponent(1)),
					this.T9e(t);
			}),
			(this.$oi = (t, i) => {
				i ? this.xoi.add(t) : this.xoi.delete(t);
			}),
			(this.n9e = (t, i) => {
				(this.r9e = i) ? this.Woi() : (this.Yoi(), this.Xoi());
			}),
			(this.Joi = () => {
				var t;
				this.CurrentEntity?.Valid &&
					(this.Goi.clear(),
					(t = this.xXe()),
					this.HudEntitySet.Num() <= this.Boi
						? this.Zoi(t)
						: this.eri(t) || this.tri(t) || this.iri(t));
			});
	}
	OnInitialize() {
		var t;
		(this.Boi = CommonParamById_1.configCommonParamById.GetIntConfig(
			"MonsterCursorMaxCount",
		)),
			(this.boi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MonsterCursorRefreshInterval",
			)),
			(this.Voi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MonsterCursorMaxDistance",
			)),
			(this.Noi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MonsterCursorMaxScale",
			)),
			(this.Ooi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MonsterCursorMinScale",
			)),
			(this.koi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MonsterCursorMaxScaleDistance",
			)),
			(this.Foi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MonsterCursorMinScaleDistance",
			)),
			(this.doi =
				CameraController_1.CameraController.FightCamera.GetComponent(5)),
			(this.CurrentEntity =
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
			this.CurrentEntity?.Valid &&
				((this.coi = this.CurrentEntity.Entity.GetComponent(1)),
				(t = this.CurrentEntity.Entity.GetComponent(185)),
				(this.r9e = t.HasTag(1996802261)),
				this.NewHudEntitySet(),
				this.ori(),
				this.rri(),
				this.T9e(this.CurrentEntity),
				this.Woi() || this.Xoi());
	}
	OnDestroyed() {
		(this.CurrentEntity = void 0),
			(this.coi = void 0),
			this.xoi.clear(),
			this.woi.clear(),
			this.I9e(),
			this.Xoi(),
			this.nri();
	}
	OnShowHud() {
		super.OnShowHud();
		for (const t of this.Uoi) t.SetActive(!1);
	}
	OnHideHud() {
		super.OnHideHud();
	}
	OnTick(t) {
		if (
			this.IsHudVisible &&
			this.r9e &&
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid
		) {
			var i,
				e,
				o = this.xXe();
			for (const t of this.Poi.values())
				t.IsValid() &&
					(e = t.GetHudEntityData()).IsValid() &&
					((i = e.GetLocation()),
					(i = this.GetInEllipsePosition(o, i)[0]),
					(e = e.GetDistanceSquaredTo(o)),
					(e = MathUtils_1.MathUtils.RangeClamp(
						e,
						this.Foi,
						this.koi,
						this.Noi,
						this.Ooi,
					)),
					t.Refresh(e / CommonDefine_1.PERCENTAGE_FACTOR, i),
					t.GetActive() || t.SetActive(!0));
		}
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.AddEntity,
			this.GUe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			);
	}
	ori() {
		var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		if (t)
			for (const i of t) i.IsInit && this.Hoi(i.Entity) && this.joi(i.Entity);
	}
	rri() {
		for (let t = 0; t < this.Boi; t++) this.sri();
	}
	nri() {
		this.DestroyAllHudUnit(), (this.Uoi.length = 0), this.Poi.clear();
	}
	sri() {
		this.NewHudUnit(
			MonsterCursorUnit_1.MonsterCursorUnit,
			"UiItem_MonCursor_Prefab",
		).then(
			(t) => {
				t.SetActive(!1), this.Uoi.push(t);
			},
			() => {},
		);
	}
	joi(t) {
		var i =
			((t = this.HudEntitySet.Add(t)).SetComponent(0),
			t.SetComponent(1),
			t.SetComponent(185),
			t.ListenForTagCountChanged(-1371021686, this.$oi),
			t.GetMonsterMatchType());
		let e = this.woi.get(i);
		e || ((e = new Set()), this.woi.set(i, e)), e.add(t);
	}
	Qoi(t) {
		var i,
			e = this.HudEntitySet.GetByEntity(t);
		e &&
			((i = e.GetMonsterMatchTypeNumber()),
			this.HudEntitySet.Remove(t),
			this.xoi.delete(e),
			(t = this.woi.get(i))) &&
			t.delete(e);
	}
	T9e(t) {
		this.I9e(),
			(t = t.Entity.GetComponent(185)),
			(this.o9e = t.ListenForTagAddOrRemove(
				1996802261,
				this.n9e,
				MonsterCursorHandle._$e,
			));
	}
	I9e() {
		this.o9e?.EndTask();
	}
	Woi() {
		return !(this.HudEntitySet.Num() <= 0 || !this.r9e || (this.ari(), 0));
	}
	ari() {
		TimerSystem_1.TimerSystem.Has(this.qoi) ||
			(this.qoi = TimerSystem_1.TimerSystem.Forever(this.Joi, this.boi));
	}
	Xoi() {
		TimerSystem_1.TimerSystem.Has(this.qoi) &&
			(TimerSystem_1.TimerSystem.Remove(this.qoi), (this.qoi = void 0));
	}
	Zoi(t) {
		for (const i of this.HudEntitySet.GetAll())
			if ((this.hri(i, t), this.Goi.size >= this.Boi)) break;
		this.lri(this.Goi);
	}
	eri(t) {
		for (const i of this.xoi)
			if ((this.hri(i, t), this.Goi.size >= this.Boi))
				return this.lri(this.Goi), !0;
		return !1;
	}
	tri(t) {
		for (let e = 2; 1 <= e; e--) {
			var i = this.woi.get(e);
			if (i && !(i.size <= 0))
				for (const e of i)
					if ((this.hri(e, t), this.Goi.size >= this.Boi))
						return this.lri(this.Goi), !0;
		}
		return !1;
	}
	iri(t) {
		let i = 0;
		var e = this.HudEntitySet.GetAll(),
			o = this.HudEntitySet.Num();
		for (let n = 0; n < o; n++) {
			var s = e[(i = n)].GetDistanceSquaredTo(t);
			for (let r = n + 1; r < o; r++)
				e[r].GetDistanceSquaredTo(t) < s && (i = r);
			i !== n && ((r = e[i]), (e[i] = e[n]), (e[n] = r));
			var r = e[n];
			if ((this.hri(r, t), this.Goi.size >= this.Boi)) break;
		}
		this.lri(this.Goi);
	}
	hri(t, i) {
		!t.IsValid() ||
			t.GetDistanceSquaredTo(i) > this.Voi ||
			!this.cri(t) ||
			this.mri(t.GetLocationProxy()) ||
			this.Goi.add(t.GetId());
	}
	cri(t) {
		return !!t.ContainsTagById(1996802261) && !t.ContainsTagById(1963731483);
	}
	mri(t) {
		return this.doi.CheckPositionInScreen(
			t,
			this.doi.CameraAdjustController.CheckInScreenMinX,
			this.doi.CameraAdjustController.CheckInScreenMaxX,
			this.doi.CameraAdjustController.CheckInScreenMinY,
			this.doi.CameraAdjustController.CheckInScreenMaxY,
		);
	}
	lri(t) {
		var i,
			e,
			o = [];
		for (const i of this.Poi.values()) {
			var s = i.GetEntityId();
			t.has(s) ||
				(i.Deactivate(), i.SetActive(!1), o.push(s), this.Uoi.push(i));
		}
		for (const t of o) this.Poi.delete(t);
		for (const o of t)
			this.gri(o) ||
				((i = this.fri()) &&
					((e = this.HudEntitySet.GetByEntityId(o)), this.pri(e, i)));
	}
	pri(t, i) {
		var e;
		i &&
			((e = t.GetId()), i.GetEntityId() !== e) &&
			(i.Activate(t), this.Poi.set(e, i));
	}
	Koi(t) {
		var i;
		t?.IsValid() &&
			((t = t.GetId()), (i = this.gri(t))) &&
			i.IsValid() &&
			(i.Deactivate(), i.SetActive(!1), this.Poi.delete(t), this.Uoi.push(i));
	}
	Yoi() {
		for (const t of this.Poi.values())
			t.IsValid() && (t.Deactivate(), t.SetActive(!1), this.Uoi.push(t));
		this.Poi.clear();
	}
	gri(t) {
		return this.Poi.get(t);
	}
	fri() {
		return this.Uoi.pop();
	}
	xXe() {
		return this.coi.ActorLocationProxy;
	}
	Hoi(t) {
		var i;
		return (
			!!ObjectSystem_1.ObjectSystem.IsValid(t) &&
			!!(t = t.GetComponent(0)) &&
			"Monster" === t.GetBaseInfo()?.Category?.MainType &&
			((i = t.GetEntityCamp()),
			2 === CampUtils_1.CampUtils.GetCampRelationship(i, 0)) &&
			void 0 !== (i = t.GetMonsterMatchType()) &&
			3 !== i
		);
	}
}
((exports.MonsterCursorHandle = MonsterCursorHandle).zoi = void 0),
	(MonsterCursorHandle.Cri = void 0),
	(MonsterCursorHandle.dri = void 0),
	(MonsterCursorHandle._ri = void 0),
	(MonsterCursorHandle.GetTargetInfo2StatObject = void 0),
	(MonsterCursorHandle._$e = void 0);
