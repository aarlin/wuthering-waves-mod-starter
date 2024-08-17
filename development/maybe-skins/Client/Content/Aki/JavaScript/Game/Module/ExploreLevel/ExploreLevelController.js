"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreLevelController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreLevelController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(23940, ExploreLevelController.l5t);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(23940);
	}
	static ExploreScoreRewardRequest(e, o) {
		var r = new Protocol_1.Aki.Protocol.sJn();
		(r.wFn = e),
			(r.e5n = o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"ExploreLevel",
					8,
					"客户端请求请求探索进度评分奖励 ExploreScoreRewardRequest",
					["request", r],
				),
			Net_1.Net.Call(16043, r, this._5t);
	}
	static CountryExploreScoreInfoRequest(e, o) {
		var r = new Protocol_1.Aki.Protocol.hJn();
		(r.t5n = e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"ExploreLevel",
					8,
					"客户端请求国家探索评分信息 CountryExploreScoreInfoRequest",
					["request", r],
				),
			Net_1.Net.Call(10593, r, (r) => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"ExploreLevel",
						8,
						"服务端返回国家探索评分信息 CountryExploreScoreInfoResponse",
						["response", r],
					),
					o && o();
				var t = ModelManager_1.ModelManager.ExploreLevelModel;
				for (const e of r.dLs) {
					var n = e.wFn;
					for (const o of e.e5n) t.SetCountryExploreScoreReceived(n, o, !0);
				}
				t.SetCountryExploreScore(e, r.cLs),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
					);
			});
	}
	static async CountryExploreScoreInfoAsyncRequest(e) {
		var o;
		if (
			(o =
				(((o = new Protocol_1.Aki.Protocol.hJn()).t5n = e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"ExploreLevel",
						8,
						"客户端请求国家探索评分信息 CountryExploreScoreInfoRequest",
						["request", o],
					),
				await Net_1.Net.CallAsync(10593, o)))
		) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"ExploreLevel",
					8,
					"服务端返回国家探索评分信息 CountryExploreScoreInfoResponse",
					["response", o],
				);
			var r = ModelManager_1.ModelManager.ExploreLevelModel;
			for (const e of o.dLs) {
				var t = e.wFn;
				for (const o of e.e5n) r.SetCountryExploreScoreReceived(t, o, !0);
			}
			r.SetCountryExploreScore(e, o.cLs),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
				);
		}
	}
}
((exports.ExploreLevelController = ExploreLevelController).l5t = (e) => {
	Log_1.Log.CheckInfo() &&
		Log_1.Log.Info("ExploreLevel", 8, "服务端通知探索等级 ExploreLevelNotify", [
			"notify",
			e,
		]);
	var o = ModelManager_1.ModelManager.ExploreLevelModel;
	for (const r of e.CLs) o.SetCountryExploreLevel(r.t5n, r.mLs);
	EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExploreLevelNotify);
}),
	(ExploreLevelController._5t = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"ExploreLevel",
				8,
				"服务端返回探索评分奖励 ExploreScoreRewardResponse",
				["response", e],
			),
			e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnExploreScoreRewardResponse,
				);
	});
