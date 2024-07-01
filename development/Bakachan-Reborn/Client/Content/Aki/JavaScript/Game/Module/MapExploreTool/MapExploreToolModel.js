"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapExploreToolModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class MapExploreToolModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.BUi = new Map()),
			(this.bUi = new Map()),
			(this.qUi = new Map()),
			(this.GUi = new Map()),
			(this.NUi = !1),
			(this.OUi = new Map()),
			(this.kUi = (o) => {
				switch (o.MarkType) {
					case 15:
						var e =
							ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(
								o.MarkType,
							) ?? 0;
						this.SetToolPlaceNum(1010, e, !0);
						break;
					case 17:
						(e =
							ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(
								o.MarkType,
							) ?? 0),
							this.SetToolPlaceNum(1012, e, !0);
				}
			}),
			(this.FUi = (o, e) => {
				switch (o) {
					case 15:
						var t =
							ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(o) ?? 0;
						this.SetToolPlaceNum(1010, t, !1);
						break;
					case 17:
						(t =
							ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(o) ?? 0),
							this.SetToolPlaceNum(1012, t, !1);
				}
			});
	}
	OnInit() {
		return (
			this.BUi.set(210015, 1010),
			this.BUi.set(210016, 1011),
			this.BUi.set(210017, 1012),
			this.bUi.set(
				1010,
				new Map([
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerNotInBigWorld,
						"ExplorePositionError",
					],
					[Protocol_1.Aki.Protocol.lkn.Proto_ErrInFighting, "ExploreFighting"],
					[Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHostPlayer, "OnylHostUse"],
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrConsumeNotEnough,
						"ExploreTeleporterItemLack",
					],
				]),
			),
			this.bUi.set(
				1011,
				new Map([
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerNotInBigWorld,
						"ExplorePositionError",
					],
					[Protocol_1.Aki.Protocol.lkn.Proto_ErrInFighting, "ExploreFighting"],
					[Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHostPlayer, "OnylHostUse"],
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHaveCountryAccess,
						"ExploreUnauthorized",
					],
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrSkillIsEffect,
						"ExploreActivating",
					],
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrNoSoundBox,
						"ExploreShengXiaCollectAll",
					],
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrConsumeNotEnough,
						"ExploreShengXiaItemLack",
					],
				]),
			),
			this.bUi.set(
				1012,
				new Map([
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerNotInBigWorld,
						"ExplorePositionError",
					],
					[Protocol_1.Aki.Protocol.lkn.Proto_ErrInFighting, "ExploreFighting"],
					[Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHostPlayer, "OnylHostUse"],
					[
						Protocol_1.Aki.Protocol.lkn.Proto_ErrNotHaveCountryAccess,
						"ExploreUnauthorized",
					],
				]),
			),
			this.qUi.set(
				1011,
				new Set([
					Protocol_1.Aki.Protocol.lkn.Sys,
					Protocol_1.Aki.Protocol.lkn.Proto_ErrSkillIsEffect,
				]),
			),
			this.qUi.set(
				1012,
				new Set([
					Protocol_1.Aki.Protocol.lkn.Sys,
					Protocol_1.Aki.Protocol.lkn.Proto_ErrTreasureBoxAllActive,
				]),
			),
			this.qUi.set(1010, new Set([Protocol_1.Aki.Protocol.lkn.Sys])),
			this.GUi.set(
				1011,
				new Set([Protocol_1.Aki.Protocol.lkn.Proto_ExploreToolNotConfirm]),
			),
			this.GUi.set(
				1012,
				new Set([
					Protocol_1.Aki.Protocol.lkn.Proto_ExploreToolNotConfirm,
					Protocol_1.Aki.Protocol.lkn.Proto_ErrTreasureBoxAllActive,
				]),
			),
			this.GUi.set(
				1010,
				new Set([Protocol_1.Aki.Protocol.lkn.Proto_ExploreToolNotConfirm]),
			),
			(this.NUi = !1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CreateMapMark,
				this.kUi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveMapMark,
				this.FUi,
			),
			!0
		);
	}
	OnClear() {
		return (
			this.BUi.clear(),
			this.bUi.clear(),
			this.qUi.clear(),
			this.OUi.clear(),
			(this.NUi = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CreateMapMark,
				this.kUi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveMapMark,
				this.FUi,
			),
			!0
		);
	}
	OnLeaveLevel() {
		return !(this.NUi = !1);
	}
	OnChangeMode() {
		return !0;
	}
	GetPhantomSkillIdBySkillId(o) {
		return this.BUi.get(o);
	}
	GetRespTipsId(o, e) {
		return this.bUi.get(o.PhantomSkillId)?.get(e.Kms);
	}
	GetRespConfirmBoxId(o, e) {
		if (this.IsRespMeanCheckPass(o, e))
			switch (o.PhantomSkillId) {
				case 1010:
					return this.IsToolReachPlaceLimit(o.PhantomSkillId) ? 142 : 141;
				case 1011:
					return 139;
				case 1012:
					return this.IsToolReachPlaceLimit(o.PhantomSkillId) ? 140 : void 0;
			}
	}
	IsRespMeanSuccess(o, e) {
		return this.qUi.get(o.PhantomSkillId)?.has(e.Kms) ?? !1;
	}
	IsRespMeanCheckPass(o, e) {
		return this.GUi.get(o.PhantomSkillId)?.has(e.Kms) ?? !1;
	}
	SetCharExploreSkillBusy(o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Phantom",
				40,
				"[MapExploreTool] 设置CharExploreSkillBusy",
				["OldVal", this.NUi],
				["NewVal", o],
			),
			(this.NUi = o);
	}
	GetCharExploreSkillBusy() {
		return this.NUi ?? !1;
	}
	GetToolPlaceLimit(o) {
		switch (o) {
			case 1010:
				return ConfigManager_1.ConfigManager.RouletteConfig?.GetTempTeleporterPlaceLimit();
			case 1012:
				return ConfigManager_1.ConfigManager.RouletteConfig?.GetTreasureBoxDetectorPlaceLimit();
		}
	}
	IsToolHasPlaceLimit(o) {
		return void 0 !== this.GetToolPlaceLimit(o);
	}
	IsToolReachPlaceLimit(o) {
		var e = this.GetToolPlaceLimit(o);
		return void 0 !== e && !!((o = this.GetToolPlaceNum(o)) && e <= o);
	}
	GetToolPlaceNum(o) {
		return this.OUi.get(o);
	}
	SetToolPlaceNum(o, e, t) {
		e !== this.OUi.get(o) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Phantom",
					40,
					"[MapExploreTool] 设置ToolPlaceNum",
					["PhantomSkillId", o],
					["PlaceNum", e],
				),
			this.OUi.set(o, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
				o,
				e,
			));
	}
}
exports.MapExploreToolModel = MapExploreToolModel;
