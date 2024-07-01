"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, a, i) {
		var r,
			o = arguments.length,
			n =
				o < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, a))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(t, e, a, i);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(r = t[s]) && (n = (o < 3 ? r(n) : 3 < o ? r(e, a, n) : r(e, a)) || n);
		return 3 < o && n && Object.defineProperty(e, a, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterPartComponent = exports.CharacterPart = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const GlobalData_1 = require("../../../../GlobalData"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
class CharacterPart {
	constructor(t, e, a) {
		(this.BaseEntity = void 0),
			(this.ActorComp = void 0),
			(this.TagComponent = void 0),
			(this.AttributeComp = void 0),
			(this.Index = 0),
			(this.PartTag = void 0),
			(this.ActiveTag = void 0),
			(this.BoneName = void 0),
			(this.SeparateDamage = !1),
			(this.IsWeakness = !1),
			(this.WeaknessTypeSet = void 0),
			(this.WeaknessAngle = 0),
			(this.InheritLife = !1),
			(this.LifeMax = 0),
			(this.Life = 0),
			(this.Active = !1),
			(this.PartSocketName = void 0),
			(this.IsPartStateVisible = !1),
			(this.IsShield = !1),
			(this.IsTransferDamage = !1),
			(this.BlockAngle = 0),
			(this.AttributeBuffList = void 0),
			(this.ScanEffect = ""),
			(this.ScanEffectSocketName = void 0),
			(this.ScanMaterialEffect = void 0),
			(this.IsWeaknessHit = !1),
			(this.HitBoneName = ""),
			(this.BaseEntity = t),
			(this.ActorComp = t.GetComponent(3)),
			(this.TagComponent = t.GetComponent(185)),
			(this.AttributeComp = t.GetComponent(156)),
			(this.Index = e),
			(this.PartTag = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
				a.部位标签.TagName,
			)),
			(this.ActiveTag =
				GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
					a.部位激活标签.TagName,
				)),
			(this.IsWeakness = a.是否弱点),
			(this.WeaknessAngle = a.弱点受击角度),
			(this.BoneName = FNameUtil_1.FNameUtil.GetDynamicFName(a.部位名)),
			(this.SeparateDamage = a.是否独立承伤),
			(this.InheritLife = 0 < a.继承生命值比例),
			(this.WeaknessTypeSet = new Set()),
			(this.PartSocketName = a.部位状态条骨骼插槽),
			(this.IsPartStateVisible = a.是否在目标创建时显示部位状态条),
			(this.IsShield = a.是否盾牌),
			(this.IsTransferDamage = a.是否传递伤害),
			(this.BlockAngle = a.格挡判定角度),
			(this.AttributeBuffList = []),
			(this.ScanEffect = a.被扫描播放特效.AssetPathName?.toString()),
			(this.ScanEffectSocketName = FNameUtil_1.FNameUtil.GetDynamicFName(
				a.扫描特效绑定骨骼名,
			)),
			(this.ScanMaterialEffect = a.扫描材质特效);
		for (let t = 0; t < a.弱点攻击类型.Num(); t++)
			this.WeaknessTypeSet.add(a.弱点攻击类型.Get(t));
		for (let t = 0; t < a.属性快照Buff列表.Num(); t++)
			this.AttributeBuffList.push(a.属性快照Buff列表.Get(t));
		this.InheritLife
			? (this.LifeMax =
					this.AttributeComp.GetCurrentValue(EAttributeId.Tkn) *
					a.继承生命值比例)
			: (this.LifeMax = -1),
			(this.Life = this.LifeMax);
	}
	SetActive(t) {
		this.Active = t;
	}
	N$o(t) {
		this.Active !== t &&
			((this.Active = t),
			this.Active
				? this.TagComponent.AddTag(this.ActiveTag?.TagId ?? 0)
				: this.TagComponent.RemoveTag(this.ActiveTag?.TagId));
	}
	UpdatePartInfo(t, e = !0) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Part",
			this.BaseEntity,
			"UpdatePartInfo",
			["TagName", this.PartTag.TagName],
			["Activated", t.Lkn],
			["LifeValue", t.d9n],
		),
			this.N$o(t.Lkn),
			(this.LifeMax = t.Tkn),
			this.HandleChangeLife(t.d9n, e);
	}
	OnDamage(t, e, a, i = !0) {
		let r = !1;
		var o = this.ActorComp.Actor,
			n = this.RemainedLifeRate();
		return (
			i &&
				((this.Life -= t),
				(i = this.RemainedLifeRate()),
				GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(
					o,
					this.PartTag,
					n,
					i,
				),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.BaseEntity,
					EventDefine_1.EEventName.CharPartDamage,
					t,
					this,
				),
				0 < n) &&
				i <= 0 &&
				(r = !0),
			e &&
				((t = a.GetComponent(3).Actor),
				GlobalData_1.GlobalData.BpEventManager.角色部位弱点打击时.Broadcast(
					o,
					this.PartTag,
					t,
				)),
			r
		);
	}
	HandleChangeLife(t, e = !0) {
		var a,
			i = this.Life - t;
		0 != i &&
			((a = this.RemainedLifeRate()), (this.Life = t), e) &&
			(a !== (t = this.RemainedLifeRate()) &&
				((e = this.ActorComp.Actor),
				GlobalData_1.GlobalData.BpEventManager.角色部位血量变化时.Broadcast(
					e,
					this.PartTag,
					a,
					t,
				)),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.BaseEntity,
				EventDefine_1.EEventName.CharPartDamage,
				i,
				this,
			));
	}
	RemainedLife() {
		return this.InheritLife ? (0 <= this.Life ? this.Life : 0) : -1;
	}
	RemainedLifeRate() {
		return this.InheritLife ? this.RemainedLife() / this.LifeMax : -1;
	}
	ResetLife() {}
}
exports.CharacterPart = CharacterPart;
let CharacterPartComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.BaseChar = void 0),
			(this.ActorComp = void 0),
			(this.TagComponent = void 0),
			(this.DtCharacterPart = void 0),
			(this.Parts = void 0),
			(this.PartMapByBone = void 0),
			(this.PartMapByTag = void 0),
			(this.WeaknessByBone = void 0),
			(this.GroupMapByBone = void 0),
			(this.Tjr = void 0),
			(this.Ljr = void 0),
			(this.Djr = !1);
	}
	get IsMultiPart() {
		return this.Djr;
	}
	OnInitData() {
		var t = this.Entity.GetComponent(0);
		return (
			(this.Ljr = t.ComponentDataMap.get("Nvs")?.Nvs),
			(this.Parts = []),
			(this.PartMapByBone = new Map()),
			(this.PartMapByTag = new Map()),
			(this.GroupMapByBone = new Map()),
			(this.WeaknessByBone = new Map()),
			(this.Tjr = []),
			!0
		);
	}
	OnInit() {
		return (
			(this.TagComponent = this.Entity.GetComponent(185)),
			this.Entity.GetComponent(3).Actor?.DtCharacterPart && (this.Djr = !0),
			!0
		);
	}
	OnActivate() {
		if (this.Djr) {
			(this.ActorComp = this.Entity.GetComponent(3)),
				(this.BaseChar = this.ActorComp.Actor),
				(this.DtCharacterPart = this.BaseChar.DtCharacterPart);
			var t = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(
					this.DtCharacterPart,
				),
				e = this.Ljr;
			for (let h = 0; h < t.length; h++) {
				var a,
					i = t[h],
					r = new CharacterPart(this.Entity, h, i),
					o =
						(this.Parts.push(r),
						this.PartMapByBone.set(i.部位名, r),
						i.骨骼名.Num()),
					n = r.IsWeakness;
				for (let t = 0; t < o; t++) {
					var s = i.骨骼名.Get(t);
					this.GroupMapByBone.set(s, i.部位名),
						n && this.WeaknessByBone.set(s, r);
				}
				this.TagComponent.RemoveTag(i.部位标签?.TagId),
					this.PartMapByTag.has(i.部位标签.TagName) &&
						CombatDebugController_1.CombatDebugController.CombatError(
							"Part",
							this.Entity,
							"部位标签重复注册",
							["v", i.部位标签.TagName],
						),
					this.PartMapByTag.set(i.部位标签.TagName, r),
					this.Tjr.push(this.Rjr(r, i.部位激活标签)),
					e
						? (a = e.oSs[h]) && r.UpdatePartInfo(a)
						: (i.是否出生激活 &&
								(this.TagComponent.HasTag(i.部位激活标签.TagId) &&
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Character",
										21,
										"部位勾选了[是否出生激活]，但是在蓝图中提前加了标签，会导致标签添加时无法触发从无到有事件，引起功能失效",
										["角色", this.BaseChar.GetName()],
										["部位", i.部位名],
									),
								this.TagComponent.AddTag(i.部位激活标签?.TagId)),
							((a = Protocol_1.Aki.Protocol.dGs.create()).d9n = r.Life),
							(a.Tkn = r.LifeMax),
							(a.o9n = r.Index),
							(a.Lkn = i.是否出生激活),
							(a.n7n = r.PartTag.TagId));
			}
		}
		return !0;
	}
	OnEnd() {
		if (this.Djr) for (const t of this.Tjr) t.EndTask();
		return !0;
	}
	IsWeakness(t) {
		return !!(t = this.WeaknessByBone.get(t)) && t.Active;
	}
	GetPart(t) {
		return (t = this.GroupMapByBone.get(t)), this.PartMapByBone.get(t);
	}
	GetPartByTag(t) {
		var e = this.PartMapByTag.get(t.TagName);
		return (
			e ||
				CombatDebugController_1.CombatDebugController.CombatError(
					"Part",
					this.Entity,
					"获取部位失败",
					["TagName", t.TagName],
				),
			e
		);
	}
	GetPartByIndex(t) {
		if (!(t < 0 || t >= this.Parts.length)) return this.Parts[t];
		CombatDebugController_1.CombatDebugController.CombatError(
			"Part",
			this.Entity,
			"获取部位失败",
			["index", t],
		);
	}
	Rjr(t, e) {
		return this.TagComponent.ListenForTagAddOrRemove(e?.TagId, (e, a) => {
			t.SetActive(a);
		});
	}
	static PartUpdateNotify(t, e) {
		var a = MathUtils_1.MathUtils.LongToNumber(e.rkn);
		if ((a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))) {
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Part",
				t,
				"PartUpdateNotify",
				["data", JSON.stringify(e)],
			);
			var i = a.Entity.GetComponent(58);
			for (const t of e.aSs) i.GetPartByIndex(t.o9n)?.UpdatePartInfo(t);
		}
	}
	static PartComponentInitNotify(t, e) {
		var a = MathUtils_1.MathUtils.LongToNumber(e.rkn);
		if ((a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))) {
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Part",
				t,
				"PartComponentInitNotify",
			);
			var i = a.Entity.GetComponent(58);
			for (const t of e.Nvs.oSs) i.GetPartByIndex(t.o9n)?.UpdatePartInfo(t);
		}
	}
	GetDebugText() {
		let t = "";
		for (const e of this.Parts)
			t +=
				"\n\t\t" +
				e.Index +
				" " +
				e.PartTag?.TagName +
				" : " +
				e.Life +
				", " +
				e.Active;
		return t;
	}
};
__decorate(
	[CombatMessage_1.CombatNet.Listen("KOn", !1)],
	CharacterPartComponent,
	"PartUpdateNotify",
	null,
),
	__decorate(
		[CombatMessage_1.CombatNet.Handle("QOn")],
		CharacterPartComponent,
		"PartComponentInitNotify",
		null,
	),
	(CharacterPartComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(58)],
		CharacterPartComponent,
	)),
	(exports.CharacterPartComponent = CharacterPartComponent);
