"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, r) {
		var l,
			a = arguments.length,
			i =
				a < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, o, r);
		else
			for (var n = e.length - 1; 0 <= n; n--)
				(l = e[n]) && (i = (a < 3 ? l(i) : 3 < a ? l(t, o, i) : l(t, o)) || i);
		return 3 < a && i && Object.defineProperty(t, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RolePreloadComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	AiBaseById_1 = require("../../../../../Core/Define/ConfigQuery/AiBaseById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil"),
	PreloadDefine_1 = require("../../../../Preload/PreloadDefine"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew");
let RolePreloadComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.zht = void 0),
			(this.mzr = void 0),
			(this.rDr = void 0),
			(this.dzr = void 0),
			(this.Czr = !1),
			(this.BBn = void 0),
			(this.wBn = 0),
			(this.gzr = (e, t) => {
				if (
					t &&
					!this.Czr &&
					(t = this.zht.GetEntityType()) ===
						Protocol_1.Aki.Protocol.wks.Proto_Monster
				) {
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Skill",
						this.Entity,
						"开始加载技能和子弹",
					),
						(this.Czr = !0),
						this.fzr(!0),
						this.bBn();
					t = (0, puerts_1.$ref)(void 0);
					var o =
						(UE.DataTableFunctionLibrary.GetDataTableRowNames(
							this.rDr.DtSkillInfo,
							t,
						),
						(0, puerts_1.$unref)(t));
					for (let e = 0; e < o.Num(); e++) {
						var r,
							l = Number(o.Get(e).toString());
						this.rDr?.LoadedSkills.has(l) ||
							((r = this.rDr.GetSkillInfo(l)) &&
								0 === r.SkillLoadType &&
								this.LoadSkillAsync(l));
					}
					for (const e of ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames()) {
						var a,
							i = Number(e);
						this.rDr?.LoadedSkills.has(i) ||
							((a = this.rDr.GetSkillInfo(i)) &&
								0 === a.SkillLoadType &&
								this.LoadSkillAsync(i));
					}
					this.qBn();
				}
			});
	}
	OnInitData() {
		return (
			PreloadDefine_1.PreloadSetting.UseNewPreload &&
				((this.rDr = this.Entity.GetComponent(33)),
				(this.mzr = this.Entity.GetComponent(1)),
				(this.zht = this.Entity.GetComponent(0)),
				this.Entity.GetComponent(185).ListenForTagAddOrRemove(
					1996802261,
					this.gzr,
				)),
			!0
		);
	}
	InitPreload(e) {
		(this.dzr = e), this.GBn(), this.OBn(), this.pzr(), this.vzr(), this.Mzr();
	}
	GBn() {
		var e = this.dzr?.BlueprintClassPath;
		e &&
			(this.BBn =
				ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
	}
	OBn() {
		ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
			? (this.wBn = 1)
			: (this.wBn = 0);
	}
	pzr() {
		var e,
			t = this.dzr,
			o = this.BBn?.SkillDataTable.ToAssetPathName();
		(t =
			(o?.length &&
				"None" !== o &&
				((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					o,
					UE.DataTable,
				))?.IsValid() ||
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Skill",
						this.Entity,
						"SkillComponent中找不到技能表",
						["ActorPath", t.BlueprintClassPath],
						["技能表Path", o],
					),
				(this.rDr.DtSkillInfo = e)),
			this.zht.GetEntityType())) === Protocol_1.Aki.Protocol.wks.Proto_Player
			? this.Szr()
			: t === Protocol_1.Aki.Protocol.wks.Proto_Vision
				? this.Ezr()
				: t === Protocol_1.Aki.Protocol.wks.Proto_Monster && this.yzr();
	}
	Szr() {
		var e = (0, puerts_1.$ref)(void 0),
			t =
				(UE.DataTableFunctionLibrary.GetDataTableRowNames(
					this.rDr.DtSkillInfo,
					e,
				),
				(0, puerts_1.$unref)(e));
		for (let e = 0; e < t.Num(); e++) {
			var o = Number(t.Get(e).toString()),
				r = this.rDr.GetSkillInfo(o);
			r &&
				0 === r.SkillLoadType &&
				PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
					this.dzr,
					o,
					!1,
				);
		}
		let l;
		e = ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
		var a = this.mzr.CreatureData.GetVisionComponent();
		a &&
			(a = PhantomUtil_1.PhantomUtil.GetVisionData(a.VisionId)) &&
			(l = a.类型);
		for (const t of e) {
			var i = Number(t),
				n = this.rDr.GetSkillInfo(i);
			n &&
				((3 === n.SkillLoadType && 1 === Number(l)) ||
					(2 === n.SkillLoadType && 0 === Number(l))) &&
				PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
					this.dzr,
					i,
					!1,
				);
		}
		this.qBn();
	}
	LoadSkillAsync(e) {
		this.dzr.FightAssetManager.SkillAssetManager.GetSkill(e) ||
			((e = PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
				this.dzr,
				e,
				!1,
			)) &&
				PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
					e,
					this.dzr.LoadPriority,
					!1,
				));
	}
	FlushSkill(e) {
		PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.dzr, e);
	}
	RemoveSkill(e) {
		PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.dzr, e);
	}
	yzr() {}
	Ezr() {
		var e = (0, puerts_1.$ref)(void 0),
			t =
				(UE.DataTableFunctionLibrary.GetDataTableRowNames(
					this.rDr.DtSkillInfo,
					e,
				),
				(0, puerts_1.$unref)(e));
		for (let e = 0; e < t.Num(); e++) {
			var o = Number(t.Get(e).toString()),
				r = this.rDr.GetSkillInfo(o);
			r &&
				0 === r.SkillLoadType &&
				PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
					this.dzr,
					o,
					!1,
				);
		}
		for (const e of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) {
			var l = Number(e),
				a = this.rDr.GetSkillInfo(l);
			a &&
				0 === a.SkillLoadType &&
				PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
					this.dzr,
					l,
					!1,
				);
		}
		this.qBn();
	}
	qBn() {
		if (0 !== this.wBn) {
			var e = this.BBn?.SkillDataTableMap.Get(this.wBn)?.ToAssetPathName();
			let l;
			if (
				(l =
					e && 0 < e.length && "None" !== e
						? ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)
						: l)
			) {
				this.rDr.DtSkillInfoExtra = l;
				e = (0, puerts_1.$ref)(void 0);
				var t =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(l, e),
					(0, puerts_1.$unref)(e));
				for (let e = 0; e < t.Num(); e++) {
					var o = Number(t.Get(e).toString()),
						r = this.rDr.GetSkillInfo(o);
					r &&
						0 === r.SkillLoadType &&
						PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
							this.dzr,
							o,
							!1,
						);
				}
			}
		}
	}
	vzr() {
		var e = this.zht.GetEntityType();
		(e !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
			e !== Protocol_1.Aki.Protocol.wks.Proto_Vision) ||
			(this.fzr(), this.bBn());
	}
	fzr(e = !1) {
		var t = this.BBn?.BulletDataTable?.ToAssetPathName();
		t?.length &&
			"None" !== t &&
			((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)),
			this.kBn(t, e) && (this.rDr.DtBulletInfo = t),
			0 !== this.wBn) &&
			(t = this.BBn?.BulletDataTableMap.Get(this.wBn)?.ToAssetPathName()) &&
			0 < t.length &&
			"None" !== t &&
			((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)),
			this.kBn(t, e)) &&
			(this.rDr.DtBulletInfoExtra = t);
	}
	kBn(e, t = !1) {
		var o = this.dzr;
		if (!e?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						4,
						"[预加载] 加载角色子弹表失败。",
						["Path", o.BlueprintClassPath],
						["子弹表Path", this.BBn?.BulletDataTable?.ToAssetPathName()],
					),
				!1
			);
		if (!e) return !1;
		var r =
			DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTableWithRowName(e);
		if (!r) return !1;
		var l = r.length;
		for (let e = 0; e < l; ++e) {
			var a = r[e];
			(a = BigInt(a[0])),
				(a = PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
					o,
					a,
				));
			t &&
				a &&
				PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
					a,
					this.dzr.LoadPriority,
					!1,
				);
		}
		return !0;
	}
	bBn() {
		const e = this.BBn?.HitEffectTable.ToAssetPathName();
		var t;
		if (
			(e &&
				0 < e.length &&
				"None" !== e &&
				((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)),
				(this.rDr.DtHitEffect = t)),
			0 !== this.wBn)
		) {
			const e = this.BBn?.HitEffectTableMap.Get(this.wBn)?.ToAssetPathName();
			e &&
				0 < e.length &&
				"None" !== e &&
				((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)),
				(this.rDr.DtHitEffectExtra = t));
		}
	}
	Mzr() {
		var e = this.dzr,
			t = e.CreatureDataComponent.GetPbEntityInitData();
		let o = 0;
		return (
			(t = (o =
				t?.ComponentsData &&
				(t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"))
					?.AiId &&
				!t.Disabled
					? t.AiId
					: o)
				? AiBaseById_1.configAiBaseById.GetConfig(o)
				: void 0),
			!(
				t?.StateMachine &&
				!PreloadControllerNew_1.PreloadControllerNew.CollectAssetByStateMachineNode(
					e,
					t.StateMachine,
				)
			)
		);
	}
};
(RolePreloadComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(194)],
	RolePreloadComponent,
)),
	(exports.RolePreloadComponent = RolePreloadComponent);
