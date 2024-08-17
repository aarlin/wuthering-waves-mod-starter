"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameBudgetAllocatorConfigCreator =
		exports.EFFECT_IMPORTANCE_ENABLE_RANGE =
		exports.EFFECT_USE_BOUNDS_RANGE =
		exports.EFFECT_ENABLE_RANGE =
			void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	PLAYER_ALWAYS_TICK_PRIORITY = 4,
	ALWAYS_TICK_PRIORITY = 5,
	ALWAYS_TICK_2_PRIORITY = 6,
	FIGHT_EFFECT_PRIPRITY = 7,
	ROLE_PRIORITY = 8,
	HUD_PRIORITY = 9,
	OTHER_PRIORITY = 10,
	IDLE_EXEC_PRIORITY = 100,
	EFFECT_IMPORTANCE_ENABLE_MAX_RANGE =
		((exports.EFFECT_ENABLE_RANGE = 30001),
		(exports.EFFECT_USE_BOUNDS_RANGE = 1e4),
		(exports.EFFECT_IMPORTANCE_ENABLE_RANGE = 2e5),
		5e5),
	HUD_ENABLE_RANGE = 5e3;
class GameBudgetAllocatorConfigCreator {
	static get TsNormalEntityGroupConfig() {
		return this.ppr;
	}
	static get TsCharacterEntityGroupConfig() {
		return this.vpr;
	}
	static get TsFightEffectGroupConfig() {
		return this.Mpr;
	}
	static get TsEffectGroupConfig() {
		return this.Spr;
	}
	static get TsEffectInportanceGroupConfig() {
		return this.U6s;
	}
	static get TsAlwaysTickConfig() {
		return this.Epr;
	}
	static get TsPlayerAlwaysTickConfig() {
		return this.ypr;
	}
	static get TsIdleExecConfig() {
		return this.Ipr;
	}
	static get TsAlwaysTick2Config() {
		return this.Tpr;
	}
	static get TsHUDTickConfig() {
		return this.Lpr;
	}
	static get TsCharacterDtailConfig() {
		return this.vbn;
	}
	static CreateCharacterEntityConfigOnly() {
		this.vbn = this.Rpr(!1);
	}
	static CreateConfigs() {
		this.Dpr(),
			this.Rpr(),
			this.Upr(),
			this.Apr(),
			this.x6s(),
			this.Ppr(),
			this.xpr(),
			this.wpr(),
			this.Bpr(),
			this.bpr();
	}
	static UpdateGroupConfigTickStrategy(e, t, a) {
		(e.ueGroupConfig.DisableActorTickStrategy = t),
			(e.ueGroupConfig.DisableActorTickDistance = a),
			cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(
				e.ueGroupConfig,
			);
	}
	static RestoreGroupConfigTickStrategy(e) {
		(e.ueGroupConfig.DisableActorTickStrategy =
			e.DefaultDisableActorTickStrategy),
			(e.ueGroupConfig.DisableActorTickDistance =
				e.DefaultDisableActorTickDistance),
			cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(
				e.ueGroupConfig,
			);
	}
	static qpr(e, t) {
		var a = (0, puerts_1.$ref)(e);
		for (const i in t) {
			var o = t[i];
			"Default" === i
				? (o ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Game", 25, "Missing default config!", [
								"GroupName",
								e.GroupName.toString(),
							])),
					cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
						a,
						o.MaxInterval,
						o.TickReductionStartSize,
						o.TickReductionIntervalSize,
					))
				: o &&
					cpp_1.FKuroGameBudgetAllocatorInterface.SetTickIntervalDetailConfig(
						a,
						o.GlobalMode,
						o.ActorMode,
						o.MaxInterval,
						o.TickReductionStartSize,
						o.TickReductionIntervalSize,
					);
		}
		cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
	}
	static Bpr() {
		var e =
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					30,
					1,
					1,
				),
			t = new UE.GameBudgetAllocatorGroupConfig(),
			a =
				((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("IdleExecGroup")),
				(t.SignificanceGroup = 0),
				(t.TickPriority = 100),
				(this.Ipr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
				(0, puerts_1.$ref)(t));
		cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
			a,
			e.MaxInterval,
			e.TickReductionStartSize,
			e.TickReductionIntervalSize,
		),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
	}
	static Rpr(e = !0) {
		var t = {
			Default:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					60,
					3e3,
					300,
				),
			Normal_Render:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					60,
					3e3,
					300,
				),
			Normal_NotRendered:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					1,
					120,
					1e3,
					100,
				),
			Fighting_Rendered:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					1,
					0,
					120,
					1e3,
					100,
				),
			Fighting_NotRendered:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					1,
					1,
					120,
					500,
					50,
				),
			Fighting_Fighting:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					1,
					2,
					1,
					1,
					1,
				),
			Cutscene_Rendered:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					2,
					0,
					1,
					1,
					1,
				),
			Cutscene_NotRendered:
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					2,
					1,
					1,
					1,
					1,
				),
		};
		return (
			e &&
				(((e = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
					FNameUtil_1.FNameUtil.GetDynamicFName("CharacterEntity")),
				(e.SignificanceGroup = 2),
				(e.TickPriority = 8),
				(this.vpr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e)),
				this.qpr(e, t)),
			t
		);
	}
	static Dpr() {
		var e = {
				Default:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						0,
						180,
						500,
						100,
					),
				Normal_Render:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						0,
						180,
						2e3,
						400,
					),
				Normal_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						1,
						600,
						500,
						100,
					),
				Fighting_Rendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						0,
						600,
						500,
						100,
					),
				Fighting_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						1,
						600,
						250,
						100,
					),
				Fighting_Fighting:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						2,
						1,
						1,
						1,
					),
				Cutscene_Rendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						2,
						0,
						180,
						2e3,
						400,
					),
				Cutscene_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						2,
						1,
						240,
						1e3,
						200,
					),
			},
			t = new UE.GameBudgetAllocatorGroupConfig();
		(t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity")),
			(t.SignificanceGroup = 1),
			(t.TickPriority = 10),
			(t.DisableActorTickStrategy = 4),
			(this.ppr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
				t,
			)),
			this.qpr(t, e);
	}
	static Upr() {
		var e =
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					1,
					1,
					1,
				),
			t = new UE.GameBudgetAllocatorGroupConfig(),
			a =
				((t.GroupName =
					FNameUtil_1.FNameUtil.GetDynamicFName("FightEffectGroup")),
				(t.SignificanceGroup = 4),
				(t.TickPriority = 7),
				(t.DisableActorTickStrategy = 1),
				(t.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE),
				(this.Mpr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
				(0, puerts_1.$ref)(t));
		cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
			a,
			e.MaxInterval,
			e.TickReductionStartSize,
			e.TickReductionIntervalSize,
		),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
	}
	static Apr() {
		var e = {
				Default:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						0,
						180,
						500,
						100,
					),
				Normal_Render:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						0,
						60,
						3e3,
						300,
					),
				Normal_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						1,
						300,
						500,
						100,
					),
				Fighting_Rendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						0,
						300,
						500,
						100,
					),
				Fighting_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						1,
						600,
						250,
						100,
					),
				Fighting_Fighting:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						2,
						1,
						1,
						1,
					),
				Cutscene_Rendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						2,
						0,
						1,
						1,
						1,
					),
				Cutscene_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						2,
						1,
						120,
						1e3,
						100,
					),
			},
			t = new UE.GameBudgetAllocatorGroupConfig();
		(t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup")),
			(t.SignificanceGroup = 2),
			(t.TickPriority = 10),
			(t.DisableActorTickStrategy = 1),
			(t.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE),
			(this.Spr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
				t,
			)),
			this.qpr(t, e);
	}
	static x6s() {
		var e = {
				Default:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						0,
						100,
						3e4,
						3e3,
					),
				Normal_Render:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						0,
						100,
						5e4,
						5e3,
					),
				Normal_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						0,
						1,
						300,
						1e4,
						1e3,
					),
				Fighting_Rendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						0,
						100,
						5e4,
						5e3,
					),
				Fighting_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						1,
						600,
						1e4,
						1e3,
					),
				Fighting_Fighting:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						1,
						2,
						100,
						5e4,
						5e3,
					),
				Cutscene_Rendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						2,
						0,
						1,
						1,
						1,
					),
				Cutscene_NotRendered:
					new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
						2,
						1,
						300,
						1e4,
						1e3,
					),
			},
			t = new UE.GameBudgetAllocatorGroupConfig();
		(t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
			"EffectImportanceGroup",
		)),
			(t.SignificanceGroup = 3),
			(t.TickPriority = 10),
			(t.DisableActorTickStrategy = 1),
			(t.DisableActorTickDistance = EFFECT_IMPORTANCE_ENABLE_MAX_RANGE),
			(this.U6s = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
				t,
			)),
			this.qpr(t, e);
	}
	static Ppr() {
		var e =
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					1,
					1,
					1,
				),
			t = new UE.GameBudgetAllocatorGroupConfig(),
			a =
				((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
					"PlayerAlwaysTickGroup",
				)),
				(t.SignificanceGroup = 4),
				(t.TickPriority = 4),
				(this.ypr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
				(0, puerts_1.$ref)(t));
		cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
			a,
			e.MaxInterval,
			e.TickReductionStartSize,
			e.TickReductionIntervalSize,
		),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
	}
	static xpr() {
		var e =
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					1,
					1,
					1,
				),
			t = new UE.GameBudgetAllocatorGroupConfig(),
			a =
				((t.GroupName =
					FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickGroup")),
				(t.SignificanceGroup = 4),
				(t.TickPriority = 5),
				(this.Epr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
				(0, puerts_1.$ref)(t));
		cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
			a,
			e.MaxInterval,
			e.TickReductionStartSize,
			e.TickReductionIntervalSize,
		),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
	}
	static wpr() {
		var e =
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					1,
					1,
					1,
				),
			t = new UE.GameBudgetAllocatorGroupConfig(),
			a =
				((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
					"CameraAlwaysTickGroup",
				)),
				(t.SignificanceGroup = 4),
				(t.TickPriority = 6),
				(this.Tpr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
				(0, puerts_1.$ref)(t));
		cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
			a,
			e.MaxInterval,
			e.TickReductionStartSize,
			e.TickReductionIntervalSize,
		),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
	}
	static bpr() {
		var e =
				new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
					0,
					0,
					5,
					2e3,
					300,
				),
			t = new UE.GameBudgetAllocatorGroupConfig(),
			a =
				((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("HUDGroup")),
				(t.SignificanceGroup = 2),
				(t.TickPriority = 9),
				(t.DisableActorTickStrategy = 1),
				(t.DisableActorTickDistance = 5e3),
				(this.Lpr =
					new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
				(0, puerts_1.$ref)(t));
		cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
			a,
			e.MaxInterval,
			e.TickReductionStartSize,
			e.TickReductionIntervalSize,
		),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
	}
	static GetEffectDynamicGroup(e) {
		var t, a, o, i, r, l, n, c, g, u, G, f;
		return e >= exports.EFFECT_IMPORTANCE_ENABLE_RANGE
			? this.TsEffectInportanceGroupConfig
			: this.TsEffectDynamicGroupConfigMap.get(e) ||
					((G = (e - (u = 0.2 * e)) / 179),
					(r = (e - (f = 0.8 * e)) / 59),
					(l = (e - (t = 0.2 * e)) / 299),
					(n = (e - (a = 0.2 * e)) / 299),
					(c = (e - (o = 0.1 * e)) / 599),
					(g = (e - (i = 0.4 * e)) / 119),
					(u = {
						Default:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								0,
								0,
								180,
								u,
								G,
							),
						Normal_Render:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								0,
								0,
								60,
								f,
								r,
							),
						Normal_NotRendered:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								0,
								1,
								300,
								t,
								l,
							),
						Fighting_Rendered:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								1,
								0,
								300,
								a,
								n,
							),
						Fighting_NotRendered:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								1,
								1,
								600,
								o,
								c,
							),
						Fighting_Fighting:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								1,
								2,
								1,
								1,
								1,
							),
						Cutscene_Rendered:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								2,
								0,
								1,
								1,
								1,
							),
						Cutscene_NotRendered:
							new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
								2,
								1,
								120,
								i,
								g,
							),
					}),
					((G = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
						FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup_" + e)),
					(G.SignificanceGroup = 2),
					(G.TickPriority = 10),
					(G.DisableActorTickStrategy = 1),
					(G.DisableActorTickDistance = e),
					(f = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(G)),
					this.TsEffectDynamicGroupConfigMap.set(e, f),
					this.qpr(G, u),
					f);
	}
}
(exports.GameBudgetAllocatorConfigCreator =
	GameBudgetAllocatorConfigCreator).TsEffectDynamicGroupConfigMap = new Map();
