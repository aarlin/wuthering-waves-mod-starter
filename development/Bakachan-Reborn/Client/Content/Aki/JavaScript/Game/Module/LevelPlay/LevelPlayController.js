"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelPlayController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapController_1 = require("../Map/Controller/MapController"),
	PowerController_1 = require("../Power/PowerController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	LevelPlayDefine_1 = require("./LevelPlayDefine"),
	INTERVAL_TIME = 1e3;
class LevelPlayController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.qfi(), !0;
	}
	static OnClear() {
		return this.Gfi(), !0;
	}
	static qfi() {
		Net_1.Net.Register(9061, LevelPlayController.Nfi),
			Net_1.Net.Register(25069, LevelPlayController.Ofi),
			Net_1.Net.Register(29337, LevelPlayController.kfi),
			Net_1.Net.Register(18070, LevelPlayController.Ffi),
			Net_1.Net.Register(3462, LevelPlayController.Vfi),
			Net_1.Net.Register(26610, LevelPlayController.Hfi);
	}
	static Gfi() {
		Net_1.Net.UnRegister(9061),
			Net_1.Net.UnRegister(25069),
			Net_1.Net.UnRegister(29337),
			Net_1.Net.UnRegister(18070),
			Net_1.Net.UnRegister(3462),
			Net_1.Net.UnRegister(26610);
	}
	static jfi() {
		const e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
		if (e) {
			var l = ModelManager_1.ModelManager.LevelPlayModel,
				o = l.GetProcessingLevelPlayInfos();
			if (0 === o.size)
				l.SetTrackLevelPlayId(LevelPlayDefine_1.INVALID_LEVELPLAYID);
			else {
				let r = l.GetTrackLevelPlayInfo();
				!r ||
					(r.CanTrack && (r.UpdateDistanceSquared(e), r.IsInTrackRange())) ||
					(r = void 0);
				const a = l.GetTrackLevelPlayId();
				o.forEach((l, o) => {
					o !== a &&
						l.CanTrack &&
						(r
							? l.TrackPriority < r.TrackPriority ||
								(l.TrackPriority > r.TrackPriority
									? (l.UpdateDistanceSquared(e), l.IsInTrackRange() && (r = l))
									: (l.UpdateDistanceSquared(e),
										l.IsInTrackRange() &&
											l.CacheDistanceSquared < r.CacheDistanceSquared &&
											(r = l)))
							: (l.UpdateDistanceSquared(e), l.IsInTrackRange() && (r = l)));
				}),
					(o = r?.Id ?? LevelPlayDefine_1.INVALID_LEVELPLAYID),
					l.SetTrackLevelPlayId(o);
			}
		}
	}
	static Wfi(e) {
		ModelManager_1.ModelManager.TrackModel.IsTracking(4, e) &&
			MapController_1.MapController.RequestTrackMapMark(10, e, !1);
	}
	static ReceiveReward(e, l) {
		if (!ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward) {
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
			if (o) {
				o = o.Entity.GetComponent(0).GetPbDataId();
				const r =
					ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfoByRewardEntityId(
						o,
					);
				if (
					r &&
					(o =
						ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
							r.RewardId,
						)) &&
					o.Cost
				) {
					const a = o.Cost.get(5);
					if (LevelPlayController.Kfi(a)) {
						if (
							((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).SetTextArgs(
								a.toString(),
							),
							o.FunctionMap.set(2, () => {
								LevelPlayController.Kfi(a) &&
									LevelPlayController.RequestReceiveReward(e, r);
							}),
							(o.DestroyFunction = () => {
								ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward =
									!1;
							}),
							0 < l)
						) {
							const e =
								ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(l);
							e &&
								"SilentArea" === e.LevelPlayType &&
								(l =
									ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
										[3],
										!1,
									)) &&
								0 < l.LeftUpCount &&
								(o.Tip = l.GetFullTip());
						}
						(ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward = !0),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								o,
							);
					}
				}
			}
		}
	}
	static RequestReceiveReward(e, l) {
		(e = Protocol_1.Aki.Protocol.Qts.create({
			rkn: MathUtils_1.MathUtils.NumberToLong(e),
		})),
			Net_1.Net.Call(14578, e, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ((e =
							ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
								e.lkn,
							)),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e))
					: l.UpdateCanGetReward(!1);
			});
	}
	static Kfi(e) {
		return (
			!!ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e) ||
			((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"ReceiveLevelPlayPowerNotEnough",
			)),
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e),
			PowerController_1.PowerController.OpenPowerView(),
			!1)
		);
	}
}
((exports.LevelPlayController = LevelPlayController).e8 = 0),
	(LevelPlayController.OnTick = (e) => {
		(LevelPlayController.e8 += e),
			LevelPlayController.e8 >= 1e3 &&
				((LevelPlayController.e8 -= 1e3), LevelPlayController.jfi());
	}),
	(LevelPlayController.Nfi = (e) => {
		for (const o of e.iAs) {
			var l =
				ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
					o.Ekn,
				);
			l.UpdateState(o.ckn),
				l.UpdateFirstPass(o.Wys),
				l.UpdateRefreshTime(o.eAs),
				l.IsClose &&
					void 0 !== l.MarkConfig &&
					0 < l.MarkConfig.MarkId &&
					LevelPlayController.Wfi(l.MarkConfig.MarkId),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneGameplay",
						19,
						"下发已开启的玩法",
						["玩法id", o.Ekn],
						["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[o.ckn]],
						["是否首通", o.Wys],
						["开启时间", o.eAs],
					);
		}
	}),
	(LevelPlayController.Ofi = (e) => {
		e = e.Ekn;
		var l,
			o =
				ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
					e,
				);
		o
			? (o.UpdateFirstPass(!0),
				void 0 !== o.FirstRewardId &&
					((l = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
						LevelPlayDefine_1.GAMEPLAY_FIRST_PROMPT_TYPE_ID,
					)),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
						l.TypeId,
						void 0,
						void 0,
						void 0,
						void 0,
						LevelPlayDefine_1.GAMEPLAY_FIRST_PROMPT_TYPE_ID,
					)),
				(l = o.LevelPlayFirstPassAction) &&
					0 < l.length &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("SceneGameplay", 34, "开始执行玩法首通动作"),
					ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
						l,
						LevelGeneralContextDefine_1.LevelPlayContext.Create(o.Id),
					)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("SceneGameplay", 19, "玩法首通信息推送", ["id", e]))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("SceneGameplay", 19, "玩法首通时，玩法不存在", [
					"玩法Id",
					e,
				]);
	}),
	(LevelPlayController.kfi = (e) => {
		var l = e.Ekn;
		switch (e.ckn) {
			case 1:
			case 2:
				ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
					l,
				).UpdateState(e.ckn);
				break;
			case 0:
				var o = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(l);
				o &&
					(ModelManager_1.ModelManager.LevelPlayModel.LevelPlayClose(o),
					o.MarkConfig) &&
					0 < o.MarkConfig.MarkId &&
					LevelPlayController.Wfi(o.MarkConfig.MarkId);
				break;
			case 3:
				ModelManager_1.ModelManager.LevelPlayModel.LevelPlayFinish(l);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"SceneGameplay",
				19,
				"玩法状态改变",
				["玩法id", l],
				["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[e.ckn]],
			);
	}),
	(LevelPlayController.Vfi = (e) => {
		var l = e.Ekn;
		let o =
			ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(l);
		(o =
			o ||
			ModelManager_1.ModelManager.LevelPlayModel.EnterLevelPlayRange(
				l,
			)).UpdateState(e.ckn),
			o.UpdateCanGetReward(e.ZDs),
			(e = o.LevelPlayEnterAction),
			o.CanExecOpenAction &&
				e &&
				0 < e.length &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneGameplay",
						34,
						"开始执行玩法进入动作(Finish状态下不会执行)",
					),
				ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
					e,
					LevelGeneralContextDefine_1.LevelPlayContext.Create(o.Id),
				)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SceneGameplay", 19, "玩法进入", ["id", l]);
	}),
	(LevelPlayController.Hfi = (e) => {
		(e = e.Ekn),
			ModelManager_1.ModelManager.LevelPlayModel.LeaveLevelPlayRange(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SceneGameplay", 19, "玩法离开", ["id", e]);
	}),
	(LevelPlayController.Ffi = (e) => {
		var l = e.Ekn;
		ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
			l,
		).UpdateRefreshTime(e.Kys),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"SceneGameplay",
					19,
					"玩法开启时间更新",
					["id", l],
					["OpenTime", e.Kys],
				);
	});
