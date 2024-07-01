"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	WuYinQuBattleConfig_1 = require("../WuYinQuBattleConfig"),
	WuYinQuBattleNameDefines_1 = require("../WuYinQuBattleNameDefines"),
	WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateFighting1 extends WuYinQuBattleStateBase_1.default {
	constructor() {
		super(...arguments), (this.Timer = -0);
	}
	GetFightingData() {
		return this.Owner.WuYinQuFightingData.WuYinQuFightingData1;
	}
	OnEnter(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderBattle", 12, "进入战斗阶段"),
			(this.Owner.当前状态 = "战斗阶段1");
		var t,
			a = this.GetFightingData();
		(this.Timer = 0),
			UE.KismetSystemLibrary.IsValid(a)
				? ((a = this.Owner.WuYinQuFightingData.GlobalMPC),
					(t = this.Owner.WuYinQuFightingData),
					a &&
						UE.KismetMaterialLibrary.SetVectorParameterValue(
							this.Owner.GetWorld(),
							a,
							WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
								.GlobalLandscapeRadiusAndHardness,
							new UE.LinearColor(
								t.LandscapeShowingRadiusCurve.GetFloatValue(1),
								WuYinQuBattleConfig_1.default.LandscapeHardness,
								0,
								0,
							),
						),
					a &&
						UE.KismetMaterialLibrary.SetScalarParameterValue(
							this.Owner.GetWorld(),
							a,
							WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
								.GlobalBlackStoneErosion,
							1,
						))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderBattle", 12, "没有配置有效的战斗氛围数据");
	}
	OnUpdate(e) {}
	OnExit(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderBattle", 12, "退出战斗阶段");
	}
}
exports.default = WuYinQuBattleStateFighting1;
