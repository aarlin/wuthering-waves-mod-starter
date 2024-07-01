"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerformanceData =
		exports.JankData =
		exports.OperationsPerformance =
			void 0);
const UE = require("ue"),
	ue_1 = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	MenuController_1 = require("../Menu/MenuController"),
	CollectionDataInfo_1 = require("./Data/CollectionDataInfo"),
	PerformanceConfig_1 = require("./PerformanceConfig"),
	SMALL_JANK_TYPE = 1,
	BIG_JANK_TYPE = 2;
class JankStatisticsCycle {
	static AddStatisticsNumber(e) {
		0 === this.NOe
			? (this.y3i = e)
			: 1 === this.NOe
				? (this.I3i = e)
				: (this.T3i = e),
			(this.NOe = (this.NOe + 1) % 3);
	}
	static IsReady() {
		return 0 !== this.y3i && 0 !== this.I3i && 0 !== this.T3i;
	}
	static GetAvg() {
		return (this.y3i + this.I3i + this.T3i) / 3;
	}
}
(JankStatisticsCycle.NOe = 0),
	(JankStatisticsCycle.y3i = 0),
	(JankStatisticsCycle.I3i = 0),
	(JankStatisticsCycle.T3i = 0);
class OperationsPerformance {
	static Init() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WorldDone,
			OperationsPerformance.Ao,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				OperationsPerformance.Ao,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BeforeLoadMap,
				OperationsPerformance.tfi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportStart,
				OperationsPerformance.tfi,
			),
			(OperationsPerformance.L3i = UE.KuroStaticLibrary.GetDeviceCPU()),
			(OperationsPerformance.D3i =
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName()),
			(OperationsPerformance.R3i = ue_1.KuroStaticLibrary.GetTotalMemoryGB()),
			(OperationsPerformance.U3i =
				ue_1.KuroStaticLibrary.GetAvailableVirtualGB()),
			(OperationsPerformance.A3i = ue_1.KuroStaticLibrary.GetBatteryLevel());
	}
	static P3i() {
		TickSystem_1.TickSystem.Add(this.Tick, "OperationsPerformance.Tick", 2, !0);
	}
	static x3i() {
		var e, r;
		ue_1.KuroStaticLibrary.CountCurFrame() &&
			((e = ue_1.KuroStaticLibrary.GetRawFrameTime()),
			(r =
				GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()),
			OperationsPerformance.w3i.AddValue(
				ue_1.KuroStaticLibrary.GetRawGameThreadTime(),
			),
			OperationsPerformance.B3i.AddValue(
				ue_1.KuroStaticLibrary.GetGPUFrameTime(),
			),
			OperationsPerformance.b3i.AddValue(
				ue_1.KuroStaticLibrary.GetRawRenderThreadTime(),
			),
			OperationsPerformance.q3i.AddValue(
				ue_1.KuroStaticLibrary.GetRawRHITTime(),
			),
			(0 < r.GetFrameRateTemporary()
				? OperationsPerformance.G3i
				: OperationsPerformance.N3i
			).AddValue(e));
	}
	static O3i() {
		if (Global_1.Global.BaseCharacter)
			return Global_1.Global.BaseCharacter.CharacterActorComponent
				.ActorLocationProxy;
	}
	static k3i(e) {
		return e <= 0
			? 0
			: JankStatisticsCycle.IsReady() && 2 * JankStatisticsCycle.GetAvg() < e
				? (OperationsPerformance.F3i++, 2)
				: (JankStatisticsCycle.AddStatisticsNumber(e),
					e > OperationsPerformance.V3i ? (OperationsPerformance.H3i++, 1) : 0);
	}
	static j3i(e) {
		var r = new JankData();
		(e =
			((r.event_id = "5"), (r.i_jank_type = e), OperationsPerformance.O3i())) &&
			((r.f_player_pos_x = Math.floor(100 * e.X) / 100),
			(r.f_player_pos_y = Math.floor(100 * e.Y) / 100),
			(r.f_player_pos_z = Math.floor(100 * e.Z) / 100)),
			(r.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			(r.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(r.s_device_info = OperationsPerformance.D3i),
			(r.s_cpu_info = OperationsPerformance.L3i),
			(r.i_memory = OperationsPerformance.R3i),
			(e = MenuController_1.MenuController.GetTargetConfig(10)),
			(r.i_image_quality = void 0 === e ? -1 : e),
			(e = MenuController_1.MenuController.GetTargetConfig(5)),
			(r.i_display_mode = void 0 === e ? -1 : e),
			(r.s_resolution = "-1"),
			ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? (r.s_resolution =
						MenuController_1.MenuController.GetTargetConfigOptionString(67))
				: void 0 !== (e = MenuController_1.MenuController.GetTargetConfig(6)) &&
					void 0 !==
						(e =
							GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionByList(
								e,
							)) &&
					(r.s_resolution = e.X + "*" + e.Y),
			(e = MenuController_1.MenuController.GetTargetConfig(56)),
			(r.i_image_detail = void 0 === e ? -1 : e),
			(e = MenuController_1.MenuController.GetTargetConfig(57));
		r.i_antialising = void 0 === e ? -1 : e;
	}
	static W3i() {
		var e = new PerformanceData(),
			r = ((e.event_id = "4"), OperationsPerformance.N3i.GetAvg(0));
		(r =
			((e.f_avg_fps = 0 !== r ? 1e3 / r : 0),
			(e.i_avg_jank = OperationsPerformance.H3i),
			(e.i_avg_big_jank = OperationsPerformance.F3i),
			(e.f_avg_ping = OperationsPerformance.K3i.GetAvg(-1)),
			(e.i_big_ping_num = OperationsPerformance.Q3i),
			OperationsPerformance.O3i())) &&
			((e.f_player_pos_x = Math.floor(100 * r.X) / 100),
			(e.f_player_pos_y = Math.floor(100 * r.Y) / 100),
			(e.f_player_pos_z = Math.floor(100 * r.Z) / 100)),
			(e.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			(e.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(e.s_device_info = OperationsPerformance.D3i),
			(e.s_cpu_info = OperationsPerformance.L3i),
			(e.i_memory = OperationsPerformance.R3i),
			(e.f_available_virtual_memory = OperationsPerformance.U3i),
			(e.f_avg_use_memory_rate = OperationsPerformance.X3i.GetAvg(-1)),
			(e.f_max_use_memory_rate = OperationsPerformance.X3i.MaxValue),
			(e.f_avg_used_virtual_memory = OperationsPerformance.$3i.GetAvg(-1)),
			(e.f_max_used_virtual_memory = OperationsPerformance.$3i.MaxValue),
			(e.f_avg_use_memory = OperationsPerformance.Y3i.GetAvg(-1)),
			(e.f_max_use_memory = OperationsPerformance.Y3i.MaxValue),
			(e.f_avg_cpu_time = OperationsPerformance.w3i.GetAvg(-1)),
			(e.f_avg_gpu_time = OperationsPerformance.B3i.GetAvg(-1)),
			(e.f_avg_render_thread_time = OperationsPerformance.b3i.GetAvg(-1)),
			(e.f_avg_rhi_thread_time = OperationsPerformance.q3i.GetAvg(-1)),
			(e.f_battery = OperationsPerformance.A3i),
			(e.f_avg_cpu_frequency = OperationsPerformance.J3i),
			(e.f_max_cpu_frequency = OperationsPerformance.z3i),
			(e.o_in_game_scene = OperationsPerformance.Z3i),
			(e.s_in_game_time = OperationsPerformance.e4i),
			(r = OperationsPerformance.G3i.GetAvg(0)),
			(e.f_plot_fps = 0 < r ? 1e3 / r : 0),
			(e.i_fps_choice =
				GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
					.GetCurrentQualityInfo()
					.GetFrameRate()),
			(r = MenuController_1.MenuController.GetTargetConfig(10)),
			(e.i_image_quality = void 0 === r ? -1 : r),
			(r = MenuController_1.MenuController.GetTargetConfig(5)),
			(e.i_display_mode = void 0 === r ? -1 : r),
			(e.s_resolution = "-1"),
			ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? (e.s_resolution =
						MenuController_1.MenuController.GetTargetConfigOptionString(67))
				: void 0 !== (r = MenuController_1.MenuController.GetTargetConfig(6)) &&
					void 0 !==
						(r =
							GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionByList(
								r,
							)) &&
					(e.s_resolution = r.X + "*" + r.Y),
			(r = MenuController_1.MenuController.GetTargetConfig(56)),
			(e.i_image_detail = void 0 === r ? -1 : r),
			(r = MenuController_1.MenuController.GetTargetConfig(57));
		(e.i_antialising = void 0 === r ? -1 : r),
			(e.i_shadow_quality =
				MenuController_1.MenuController.GetTargetConfig(54)),
			(e.i_effect_quality =
				MenuController_1.MenuController.GetTargetConfig(55)),
			(e.i_ao = MenuController_1.MenuController.GetTargetConfig(58)),
			OperationsPerformance.N3i.Clear(),
			(OperationsPerformance.H3i = 0),
			(OperationsPerformance.F3i = 0),
			OperationsPerformance.K3i.Clear(),
			(OperationsPerformance.Q3i = 0),
			OperationsPerformance.X3i.Clear(),
			OperationsPerformance.Y3i.Clear(),
			OperationsPerformance.$3i.Clear(),
			OperationsPerformance.w3i.Clear(),
			OperationsPerformance.B3i.Clear(),
			OperationsPerformance.b3i.Clear(),
			OperationsPerformance.q3i.Clear(),
			OperationsPerformance.G3i.Clear(),
			LogReportController_1.LogReportController.LogReport(e);
	}
	static AddPing(e) {
		OperationsPerformance.R2e &&
			(0 < OperationsPerformance.K3i.Count &&
				e > OperationsPerformance.K3i.LastValue + 50 &&
				OperationsPerformance.Q3i++,
			OperationsPerformance.K3i.AddValue(e));
	}
	static StartEntityPerformanceTest() {
		PerformanceConfig_1.OPERATIONS_IS_OPEM
			? (OperationsPerformance.R2e = !1)
			: OperationsPerformance.gU ||
				((OperationsPerformance.gU = !0),
				(OperationsPerformance.N3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.K3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.X3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.Y3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.$3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.w3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.B3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.b3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.q3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.G3i =
					new CollectionDataInfo_1.CollectionDataInfo())),
			this.ConsumePerformanceData(),
			(this.t4i = TickSystem_1.TickSystem.Add(
				this.i4i,
				"EntityPerformanceTest.Tick",
				2,
				!0,
			).Id);
	}
	static ConsumePerformanceData() {
		var e = OperationsPerformance.N3i.GetAvg(-1),
			r = OperationsPerformance.w3i.GetAvg(-1),
			a = OperationsPerformance.B3i.GetAvg(-1),
			o = OperationsPerformance.b3i.GetAvg(-1),
			i = OperationsPerformance.q3i.GetAvg(-1);
		return (
			OperationsPerformance.N3i.Clear(),
			OperationsPerformance.K3i.Clear(),
			(OperationsPerformance.Q3i = 0),
			OperationsPerformance.X3i.Clear(),
			OperationsPerformance.Y3i.Clear(),
			OperationsPerformance.$3i.Clear(),
			OperationsPerformance.w3i.Clear(),
			OperationsPerformance.B3i.Clear(),
			OperationsPerformance.b3i.Clear(),
			OperationsPerformance.q3i.Clear(),
			OperationsPerformance.G3i.Clear(),
			[e, r, a, o, i]
		);
	}
	static CloseEntityPerformanceTest() {
		this.t4i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.t4i),
			(this.t4i = TickSystem_1.TickSystem.InvalidId)),
			this.ConsumePerformanceData(),
			this.ClearEntityPerformanceTestPromise(),
			PerformanceConfig_1.OPERATIONS_IS_OPEM &&
				((OperationsPerformance.o4i = 6e4),
				(OperationsPerformance.r4i = 3e3),
				(OperationsPerformance.R2e = !0));
	}
	static NewEntityPerformanceTestPromise() {
		this.EntityPerformanceTestPromise = new CustomPromise_1.CustomPromise();
	}
	static ClearEntityPerformanceTestPromise() {
		this.EntityPerformanceTestPromise = void 0;
	}
}
((exports.OperationsPerformance = OperationsPerformance).gU = !1),
	(OperationsPerformance.R2e = !1),
	(OperationsPerformance.n4i = !1),
	(OperationsPerformance.R3i = 0),
	(OperationsPerformance.U3i = 0),
	(OperationsPerformance.H3i = 0),
	(OperationsPerformance.F3i = 0),
	(OperationsPerformance.K3i = void 0),
	(OperationsPerformance.N3i = void 0),
	(OperationsPerformance.X3i = void 0),
	(OperationsPerformance.$3i = void 0),
	(OperationsPerformance.Y3i = void 0),
	(OperationsPerformance.w3i = void 0),
	(OperationsPerformance.B3i = void 0),
	(OperationsPerformance.b3i = void 0),
	(OperationsPerformance.q3i = void 0),
	(OperationsPerformance.G3i = void 0),
	(OperationsPerformance.L3i = void 0),
	(OperationsPerformance.D3i = void 0),
	(OperationsPerformance.A3i = 0),
	(OperationsPerformance.J3i = -0),
	(OperationsPerformance.z3i = -0),
	(OperationsPerformance.e4i = void 0),
	(OperationsPerformance.V3i = 84),
	(OperationsPerformance.Q3i = 0),
	(OperationsPerformance.o4i = 6e4),
	(OperationsPerformance.r4i = 3e3),
	(OperationsPerformance.Z3i = []),
	(OperationsPerformance.s4i = 1e4),
	(OperationsPerformance.t4i = TickSystem_1.TickSystem.InvalidId),
	(OperationsPerformance.EntityPerformanceTestPromise = void 0),
	(OperationsPerformance.Ao = () => {
		(OperationsPerformance.R2e = PerformanceConfig_1.OPERATIONS_IS_OPEM),
			OperationsPerformance.R2e &&
				!OperationsPerformance.gU &&
				((OperationsPerformance.gU = !0),
				(OperationsPerformance.N3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.K3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.X3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.$3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.Y3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.w3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.B3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.b3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.q3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				(OperationsPerformance.G3i =
					new CollectionDataInfo_1.CollectionDataInfo()),
				OperationsPerformance.P3i(),
				UE.ThinkingAnalytics.ToggleSampleCPUFrequency(!0, 5),
				Log_1.Log.CheckWarn()) &&
				Log_1.Log.Warn("Performance", 10, "OperationsPerformance.Open", [
					"OperationsPerformance.IsOpen",
					OperationsPerformance.R2e,
				]);
	}),
	(OperationsPerformance.tfi = () => {
		OperationsPerformance.R2e && (OperationsPerformance.R2e = !1);
	}),
	(OperationsPerformance.Tick = (e) => {
		var r;
		OperationsPerformance.R2e &&
			(OperationsPerformance.x3i(),
			(OperationsPerformance.r4i -= e),
			OperationsPerformance.r4i <= 0 &&
				((OperationsPerformance.r4i = 3e3),
				ue_1.KuroStaticLibrary.CountCurMemory(),
				OperationsPerformance.X3i.AddValue(
					ue_1.KuroStaticLibrary.GetUseMemoryProportion(),
				),
				OperationsPerformance.Y3i.AddValue(
					ue_1.KuroStaticLibrary.GetUsedMemoryGB(),
				),
				OperationsPerformance.$3i.AddValue(
					ue_1.KuroStaticLibrary.GetUsedVirtualGB(),
				)),
			(OperationsPerformance.r4i -= e),
			(OperationsPerformance.s4i -= e),
			OperationsPerformance.s4i <= 0 &&
				((OperationsPerformance.s4i = 1e4),
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
					158,
				)?.IsInFightState()
					? OperationsPerformance.Z3i.includes(1) ||
						OperationsPerformance.Z3i.push(1)
					: ModelManager_1.ModelManager.PlotModel.IsInPlot
						? ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
							? OperationsPerformance.Z3i.includes(2) ||
								OperationsPerformance.Z3i.push(2)
							: OperationsPerformance.Z3i.includes(3) ||
								OperationsPerformance.Z3i.push(3)
						: OperationsPerformance.Z3i.includes(4) ||
							OperationsPerformance.Z3i.push(4)),
			OperationsPerformance.n4i &&
				(r = OperationsPerformance.N3i.LastValue) &&
				0 < (r = OperationsPerformance.k3i(r)) &&
				OperationsPerformance.j3i(r),
			(OperationsPerformance.o4i -= e),
			OperationsPerformance.o4i <= 0) &&
			((OperationsPerformance.o4i = 6e4),
			(OperationsPerformance.J3i =
				UE.ThinkingAnalytics.GetCurrentCPUSampledAvgFrequency()),
			(OperationsPerformance.z3i =
				UE.ThinkingAnalytics.GetCurrentCPUSampledMaxFrequency()),
			UE.ThinkingAnalytics.ToggleSampleCPUFrequency(!1, 0),
			(OperationsPerformance.e4i =
				ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString),
			OperationsPerformance.W3i(),
			UE.ThinkingAnalytics.ToggleSampleCPUFrequency(!0, 5));
	}),
	(OperationsPerformance.i4i = (e) => {
		OperationsPerformance.x3i();
	});
class JankData extends LogReportDefine_1.PlayerCommonLogData {
	constructor() {
		super(),
			(this.i_jank_type = 0),
			(this.f_player_pos_x = 0),
			(this.f_player_pos_y = 0),
			(this.f_player_pos_z = 0),
			(this.i_inst_id = 0),
			(this.i_area_id = 0),
			(this.s_device_info = ""),
			(this.s_cpu_info = ""),
			(this.i_memory = 0),
			(this.i_image_quality = 0),
			(this.i_display_mode = 0),
			(this.s_resolution = ""),
			(this.i_image_detail = 0),
			(this.i_antialising = 0);
	}
}
exports.JankData = JankData;
class PerformanceData extends LogReportDefine_1.PlayerCommonLogData {
	constructor() {
		super(),
			(this.f_avg_fps = 0),
			(this.i_avg_jank = 0),
			(this.i_avg_big_jank = 0),
			(this.f_avg_ping = 0),
			(this.i_big_ping_num = 0),
			(this.f_player_pos_x = 0),
			(this.f_player_pos_y = 0),
			(this.f_player_pos_z = 0),
			(this.i_inst_id = 0),
			(this.i_area_id = 0),
			(this.s_device_info = ""),
			(this.s_cpu_info = ""),
			(this.i_memory = 0),
			(this.f_battery = 0),
			(this.f_avg_use_memory_rate = 0),
			(this.f_max_use_memory_rate = 0),
			(this.f_avg_use_memory = 0),
			(this.f_max_use_memory = 0),
			(this.f_available_virtual_memory = 0),
			(this.f_avg_used_virtual_memory = 0),
			(this.f_max_used_virtual_memory = 0),
			(this.f_avg_cpu_time = 0),
			(this.f_avg_cpu_frequency = 0),
			(this.f_max_cpu_frequency = 0),
			(this.o_in_game_scene = void 0),
			(this.s_in_game_time = ""),
			(this.i_fps_choice = 0),
			(this.f_avg_gpu_time = 0),
			(this.f_avg_render_thread_time = 0),
			(this.f_avg_rhi_thread_time = 0),
			(this.i_image_quality = 0),
			(this.i_display_mode = 0),
			(this.s_resolution = ""),
			(this.i_image_detail = 0),
			(this.i_antialising = 0),
			(this.i_shadow_quality = 0),
			(this.i_effect_quality = 0),
			(this.i_ao = 0),
			(this.i_teammate_effect_quality = 0),
			(this.i_crowd_density = 0),
			(this.f_plot_fps = 0),
			(this.f_ui_fps = 0);
	}
}
exports.PerformanceData = PerformanceData;
