"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombatDebugController = void 0);
const cpp_1 = require("cpp"),
	UE = require("ue"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	Time_1 = require("../../Core/Common/Time"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	ThinkDataLaunchReporter_1 = require("../../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CombatDebugHelper_1 = require("./CombatDebug/CombatDebugHelper"),
	game = {},
	REFRESH_SERVER_INFO_PERIOD = 300;
class CombatDebugController extends ControllerBase_1.ControllerBase {
	static CombatInfo(e, t, o, ...r) {
		this.A5(0, e, t, o, r);
	}
	static CombatDebug(e, t, o, ...r) {
		Info_1.Info.IsBuildDevelopmentOrDebug && this.A5(1, e, t, o, r);
	}
	static CombatDebugEx(e, t, o, ...r) {
		this.DebugCombatInfo && this.A5(1, e, t, o, r);
	}
	static CombatWarn(e, t, o, ...r) {
		this.A5(2, e, t, o, r);
	}
	static CombatError(e, t, o, ...r) {
		this.A5(3, e, t, o, r);
	}
	static CombatErrorWithStack(e, t, o, r, ...n) {
		r instanceof Error
			? this.A5(3, e, t, o, n, r)
			: this.A5(3, e, t, o, [...n, ["error", r]]);
	}
	static A5(e, t, o, r, n, a) {
		let i = 0,
			s = "",
			g = "";
		"number" == typeof o
			? (i = o)
			: ((C = o?.GetComponent(0)) &&
					((i = C.GetCreatureDataId()),
					(s = Protocol_1.Aki.Protocol.HBs[C.GetEntityType()])),
				(C = o?.GetComponent(3))?.Actor && (g = C.Actor.GetName()));
		var C,
			l = `[${t}][EntityId:${i}:${s}:${g}] ` + r;
		switch (e) {
			case 0:
				Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, l, ...n);
				break;
			case 1:
				Log_1.Log.CheckDebug() && Log_1.Log.Debug("CombatInfo", 15, l, ...n);
				break;
			case 2:
				Log_1.Log.CheckWarn() && Log_1.Log.Warn("CombatInfo", 15, l, ...n);
				break;
			case 3:
				a
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack("CombatInfo", 15, l, a, ...n)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("CombatInfo", 15, l, ...n);
		}
	}
	static CombatInfoMessage(e, t, o) {
		this.DebugCombatInfo &&
			this.cCr.get(t) &&
			(o
				? ((o = `[Message][${e}][${t}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.rkn)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.a4n)}]`),
					Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o))
				: ((o = `[Message][${e}][${t}]`),
					Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o)));
	}
	static CombatContextInfoMessage(e, t, o) {
		this.DebugCombatInfo &&
			this.cCr.get(t) &&
			(o = o.r4n) &&
			((e = `[Message][${e}][${t}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.rkn)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.a4n)}][MessageId:${MathUtils_1.MathUtils.LongToBigInt(o.s4n)}][PreMessageId:${MathUtils_1.MathUtils.LongToBigInt(o.n4n)}]`),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("CombatInfo", 51, e);
	}
	static FilterCmd(e) {
		return (
			CombatDebugController.ScriptHelper.Init(),
			CombatDebugController.ScriptHelper.FilterCmd(e)
		);
	}
	static EvalScript(script) {
		const filteredScript = CombatDebugController.FilterCmd(script);
		try {
			const preProcess =
					"\n            const ModelManager = require('../Manager/ModelManager')?.ModelManager;\n            const EntitySystem = require('../../Core/Entity/EntitySystem')?.EntitySystem;\n            const EventSystem = require('../Common/Event/EventSystem')?.EventSystem;\n            const EEventName = require('../Common/Event/EventDefine')?.EEventName;\n            const isComponentInstance = require(\"../../Core/Entity/RegisterComponent\").isComponentInstance\n            const UE = require('ue');\n            const CombatScriptHelper = this.ScriptHelper;\n            const Log = require('../../Core/Common/Log')?.Log;\n            const {ELogAuthor, ELogModule} = require('../../Core/Define/LogDefine') ?? {};\n            const TimerSystem = require('../../Core/Timer/TimerSystem')?.TimerSystem;\n            const FormationAttributeController = require(\"../Module/Abilities/FormationAttributeController\").FormationAttributeController;\n            \n",
				ret =
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Character", 20, "脚本执行...", [
							"代码",
							filteredScript,
						]),
					String(eval(preProcess + filteredScript)));
			return (
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Character", 20, "脚本执行执行完成", ["返回值", ret]),
				ret
			);
		} catch (e) {
			return e instanceof Error
				? (Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Editor",
							20,
							"脚本执行异常",
							e,
							["err", e.name],
							["msg", e.message],
						),
					`${e.name}:${e.message}\n` + e.stack)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("LocalStorage", 20, "脚本执行异常", ["error", e]),
					String(e));
		}
	}
	static mCr() {
		var e;
		UE.ThinkingAnalytics.HasInstanceInitialized(9) ||
			((e = new UE.CreateInstanceParam(
				9,
				this.dCr,
				this.CCr,
				UE.ThinkingAnalytics.GetMachineID(),
				ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
				"CombatData",
				"",
				1e3,
				0,
				0,
				0,
				!0,
				!1,
				!1,
				!0,
				ThinkDataLaunchReporter_1.EXIT_WAIT_TIME,
				ThinkDataLaunchReporter_1.MAX_PENDING_LOG,
				ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT,
				!0,
				ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL,
				ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER,
			)),
			UE.ThinkingAnalytics.CreateSimpleInstance(e));
	}
	static DataReport(e, t) {
		ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS &&
			Info_1.Info.IsBuildDevelopmentOrDebug &&
			(this.mCr(), cpp_1.FThinkingAnalyticsForPuerts.Track(e, t, 9));
	}
	static RefreshServerDebugInfo() {
		var e;
		!this.DebugEntityId ||
			!(e = EntitySystem_1.EntitySystem.Get(this.DebugEntityId)?.GetComponent(
				20,
			)) ||
			Time_1.Time.Now - this.u3t < REFRESH_SERVER_INFO_PERIOD ||
			((this.u3t = Time_1.Time.Now), e?.ServerDebugInfoRequest());
	}
}
(exports.CombatDebugController = CombatDebugController),
	(CombatDebugController.DebugEntityId = 0),
	(CombatDebugController.DebugCombatInfo = !1),
	(CombatDebugController.ScriptHelper =
		new CombatDebugHelper_1.CombatScriptHelper()),
	(CombatDebugController.cCr = new Map([
		["$2n", !0],
		["X2n", !0],
		["Y2n", !0],
		["J2n", !0],
		["z2n", !0],
		["iNn", !0],
		["rNn", !0],
		["eNn", !0],
		["tNn", !0],
		["mNn", !0],
		["Z2n", !0],
		["FOn", !0],
		["VOn", !0],
		["HOn", !0],
		["jOn", !0],
		["WOn", !0],
		["YOn", !0],
		["ZOn", !0],
		["$On", !0],
		["XOn", !0],
		["l2n", !0],
		["KOn", !0],
		["i2n", !0],
		["zOn", !0],
		["K2n", !0],
		["lNn", !0],
		["_Nn", !0],
		["Q2n", !0],
		["n2n", !0],
	])),
	(CombatDebugController.CCr = "773a58b321b8462e8431e0b3010bb3d3"),
	(CombatDebugController.dCr = "https://ali-sh-datareceiver.kurogame.xyz"),
	(CombatDebugController.u3t = 0);
