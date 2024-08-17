"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapExploreToolController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	MapExploreToolDefine_1 = require("./MapExploreToolDefine"),
	MAX_ROLE_HALF_HEIGHT = 85,
	MAX_ROLE_RADIUS = 25,
	TRACE_PROFILE_KEY = "CheckUpperSpaceEnoughForRole";
class MapExploreToolController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return !0;
	}
	static OnAddEvents() {}
	static OnRemoveEvents() {}
	static CheckUseMapExploreTool(o, e) {
		var r =
			ModelManager_1.ModelManager.MapExploreToolModel.GetPhantomSkillIdBySkillId(
				e,
			);
		if (r) {
			var n =
				ModelManager_1.ModelManager.CreatureModel.GetEntityById(
					o,
				)?.Entity?.GetComponent(3);
			if (n) {
				const t = new MapExploreToolDefine_1.MapExploreToolUsingInfo();
				(t.CharId = o),
					(t.Pos = n.FloorLocation),
					(t.Rot = n.ActorRotationProxy),
					(t.SkillId = e),
					(t.PhantomSkillId = r),
					this.SUi(t)
						? (ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(
								!0,
							),
							this.EUi(t, (o) => {
								this.yUi(t, o);
							}))
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Phantom",
									40,
									"[MapExploreTool] 客户端检测未通过",
									["UsingInfo", t],
								),
							this.IUi(t, !1));
			}
		}
	}
	static TUi(o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 请求正式使用探索工具", [
				"UsingInfo",
				o,
			]),
			this.LUi(o, !0, (e) => {
				e &&
				ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanSuccess(o, e)
					? (this.$xn(o, "ExploreDeploySuccess"), this.DUi(o, e))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Phantom",
								40,
								"[MapExploreTool] 探索工具使用失败",
								["UsingInfo", o],
								["Response", e],
							),
						this.IUi(o, !1));
			});
	}
	static IUi(o, e) {
		ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(!1),
			e ||
				ModelManager_1.ModelManager.CreatureModel.GetEntityById(o.CharId)
					?.Entity?.GetComponent(186)
					?.ModifyCdTime([o.SkillId], 0, -1);
	}
	static SUi(o) {
		var e, r, n;
		return ModelManager_1.ModelManager.MapExploreToolModel.GetCharExploreSkillBusy()
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Phantom",
						40,
						"[MapExploreTool] 使用过快，当前仍在请求使用探索工具中",
						["UsingInfo", o],
					),
				!1)
			: ((n = (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
					o.CharId,
				))?.Entity?.GetComponent(3)),
				(e = r?.Entity?.GetComponent(158)),
				r && n && e
					? n.IsAutonomousProxy
						? e.PositionState !==
							CharacterUnifiedStateTypes_1.ECharPositionState.Ground
							? (this.RUi(o, "ExploreStateError"),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 非贴地使用", [
										"UsingInfo",
										o,
									]),
								!1)
							: ((r =
									ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
								(n =
									ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
										r,
									))?.InstType !==
									Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance ||
								13 !== n?.InstSubType
									? (this.RUi(o, "ExplorePositionError"),
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Phantom",
												40,
												"[MapExploreTool] 非大世界使用",
												["UsingInfo", o],
											),
										!1)
									: 1010 !== o.PhantomSkillId || this.UUi(o))
						: (this.RUi(o, "OnylHostUse"),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 非主控使用", [
									"UsingInfo",
									o,
								]),
							!1)
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 使用者异常", [
								"UsingInfo",
								o,
							]),
						!1));
	}
	static UUi(o) {
		return !(
			1010 !== o.PhantomSkillId ||
			(ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(0)
				? ModelManager_1.ModelManager.MapModel.IsInMapPolygon(o.Pos)
					? !this.AUi(o.Pos) &&
						(this.RUi(o, "ExplorePositionError"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Phantom",
								40,
								"[MapExploreTool] 目标位置空余高度不足",
								["UsingInfo", o],
							),
						1)
					: (this.RUi(o, "ExplorePositionError"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Phantom",
								40,
								"[MapExploreTool] 不在世界开放区域内",
								["UsingInfo", o],
							),
						1)
				: (this.RUi(o, "ExploreTeleporterBan"),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Phantom",
							40,
							"[MapExploreTool] 放置临时传送点功能被禁用",
							["UsingInfo", o],
						),
					1))
		);
	}
	static AUi(o) {
		var e = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace();
		if (!e) return !1;
		(e.WorldContextObject = GlobalData_1.GlobalData.World),
			(e.HalfHeight = 85),
			(e.Radius = 25);
		var r = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
		r.DeepCopy(o),
			(r.Z += 85),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, r),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, r),
			(o = TraceElementCommon_1.TraceElementCommon.CapsuleTrace(
				e,
				TRACE_PROFILE_KEY,
			));
		return (
			ModelManager_1.ModelManager.TraceElementModel.ClearCapsuleTrace(), !o
		);
	}
	static EUi(o, e) {
		this.LUi(o, !1, e);
	}
	static yUi(o, e) {
		if (e) {
			var r = this.PUi(o, e),
				n = this.xUi(o, e);
			if (
				ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanCheckPass(
					o,
					e,
				)
			)
				return void (n || this.TUi(o));
			if (1011 === o.PhantomSkillId && this.wUi(o, e)) return;
			r ||
				n ||
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Phantom",
						40,
						"[MapExploreTool] 服务端检测结果未提示或处理，可能发生了意料之外的错误",
						["UsingInfo", o],
						["Response", e],
					));
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Phantom",
				40,
				"[MapExploreTool] 服务端检测未通过",
				["UsingInfo", o],
				["Response", e],
			),
			this.IUi(o, !1);
	}
	static wUi(o, e) {
		return (
			1011 === o.PhantomSkillId &&
			e?.Kms === Protocol_1.Aki.Protocol.lkn.Proto_ErrSkillIsEffect &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Phantom",
					40,
					"[MapExploreTool] 不请求正式使用探索工具，直接认为执行成功",
					["UsingInfo", o],
					["Response", e],
				),
			this.DUi(o),
			!0)
		);
	}
	static DUi(o, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Phantom", 40, "[MapExploreTool] 探索工具使用成功", [
				"UsingInfo",
				o,
			]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
				o,
				e,
			),
			this.IUi(o, !0);
	}
	static xUi(o, e) {
		var r = ModelManager_1.ModelManager.MapExploreToolModel.GetRespConfirmBoxId(
			o,
			e,
		);
		if (!r) return !1;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Phantom",
				40,
				"[MapExploreTool] 根据消息处理弹窗",
				["UsingInfo", o],
				["Response", e],
				["ConfirmBoxId", r],
			);
		var n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r);
		switch (r) {
			case 139:
			case 141:
			case 142: {
				var t =
					ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
						o.PhantomSkillId,
					);
				let e;
				var a = void 0;
				let l;
				t &&
					1 === t.size &&
					(([[a, l]] = t),
					(e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(a))),
					t
						? (n.ItemIdMap = t)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Phantom",
								40,
								`[MapExploreTool] 查询不到确认框${r}对应的道具`,
							),
					e && l
						? n.SetTextArgs(e, l.toString())
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Phantom",
								40,
								`[MapExploreTool] 查询不到确认框${r}对应的文本参数`,
							);
				break;
			}
		}
		return (
			n.FunctionMap.set(1, () => {
				this.IUi(o, !1);
			}),
			n.FunctionMap.set(2, () => {
				this.TUi(o);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				n,
			),
			!0
		);
	}
	static PUi(o, e) {
		var r = ModelManager_1.ModelManager.MapExploreToolModel.GetRespTipsId(o, e);
		return (
			!!r &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Phantom",
					40,
					"[MapExploreTool] 根据消息处理飘字",
					["UsingInfo", o],
					["Response", e],
					["PromptId", r],
				),
			this.RUi(o, r),
			!0)
		);
	}
	static RUi(o, e) {
		var r = [];
		switch (e) {
			case "ExploreActivating":
				if (
					!(n =
						ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
							o.PhantomSkillId,
						)) ||
					n.length <= 0
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Phantom",
							40,
							`[MapExploreTool] 查询不到通用提示${e}对应的技能名参数`,
						)
					);
				r.push(n);
				break;
			case "ExploreTeleporterItemLack":
			case "ExploreShengXiaItemLack":
				if (
					!(n =
						ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(
							o.PhantomSkillId,
						)) ||
					n.size <= 0
				)
					return;
				var n,
					[n] = n.keys();
				if (
					!(n = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(n)) ||
					n.length <= 0
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Phantom",
							40,
							`[MapExploreTool] 查询不到通用提示${e}对应的道具名参数`,
						)
					);
				r.push(n);
		}
		ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
			e,
			r,
		);
	}
	static $xn(o, e) {
		var r = [];
		if ("ExploreDeploySuccess" === e) {
			if (
				!(o =
					ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(
						o.PhantomSkillId,
					)) ||
				o.length <= 0
			)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						40,
						`[MapExploreTool] 查询不到通用提示${e}对应的技能名参数`,
					)
				);
			r.push(o);
		}
		ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
			e,
			r,
		);
	}
	static LUi(o, e, r) {
		var n = Protocol_1.Aki.Protocol.SJn.create();
		(n.M3n = o.Pos),
			(n.S3n = o.Rot),
			(n.vkn = o.PhantomSkillId),
			(n.$6n = e),
			Net_1.Net.Call(22248, n, r);
	}
}
exports.MapExploreToolController = MapExploreToolController;
