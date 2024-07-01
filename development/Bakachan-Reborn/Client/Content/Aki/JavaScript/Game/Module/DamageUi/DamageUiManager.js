"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageUiManager = exports.DamageInfo = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Queue_1 = require("../../../Core/Container/Queue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ModManager_1 = require("../../Manager/ModManager"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	BattleUiDefine_1 = require("../BattleUi/BattleUiDefine"),
	DamageUiSequencePool_1 = require("./DamageUiSequencePool"),
	DamageViewData_1 = require("./DamageViewData"),
	DamageView_1 = require("./View/DamageView"),
	PRELOAD_DAMAGE_VIEW_COUNT = 21,
	MAX_DAMAGE_PER_FRAME = 1;
class DamageInfo {
	constructor() {
		(this.Damage = 0),
			(this.ElementId = 0),
			(this.DamagePosition = void 0),
			(this.IsOwnPlayer = !1),
			(this.IsCritical = !1),
			(this.IsCure = !1),
			(this.DamageTextId = 0),
			(this.DamageText = "");
	}
}
exports.DamageInfo = DamageInfo;
class DamageUiManager {
	static Initialize() {
		(this.MinDamageOffsetScale =
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"MinDamageOffsetScale",
			) / 100),
			(this.MaxDamageOffsetScale =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MaxDamageOffsetScale",
				) / 100),
			(this.MinDamageOffsetDistance =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MinDamageOffsetDistance",
				)),
			(this.MaxDamageOffsetDistance =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MaxDamageOffsetDistance",
				)),
			(this.DamagePositionCache = Vector_1.Vector.Create()),
			(this.Okt =
				ConfigManager_1.ConfigManager.DamageUiConfig.GetAllDamageTextConfig()),
			this.InitializeDamageViewData();
	}
	static InitializeDamageViewData() {
		for (const e of this.Okt) {
			var a = new DamageViewData_1.DamageViewData();
			a.Initialize(e), this.kkt.set(e.Id, a);
		}
	}
	static ClearDamageViewData() {
		this.kkt.clear();
	}
	static GetDamageViewData(a) {
		return this.kkt.get(a);
	}
	static PreloadDamageView() {
		for (let e = this.Fkt.length; e < 21; e++) {
			var a = new DamageView_1.DamageView();
			a.Init(), this.TotalDamageViewNum++, this.Fkt.push(a);
		}
	}
	static PreloadSequence() {}
	static ApplyDamage(a, e, t, i, r, n, o = -1, g = "") {
		if (
			DamageUiManager.Vkt &&
			i.Active &&
			!(o < 0 || (1 === o && n && 0 === a))
		) {
			var m = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
			if (m) {
				let s;
				(m = m.Id === i.Id),
					((s =
						0 < this.Hkt.length ? this.Hkt.pop() : new DamageInfo()).Damage =
						a),
					(s.ElementId = e),
					(s.DamagePosition = t),
					(s.IsOwnPlayer = m),
					(s.IsCritical = r),
					(s.IsCure = n),
					(s.DamageTextId = o),
					(s.DamageText = g),
					this.jkt.Push(s);
			}
		}
	}
	static Wkt(a) {
		if (ModManager_1.ModManager.Settings.HideDmgUi) return !1;
		var e, t, i, r;
		DamageUiManager.Vkt &&
			((e = Math.floor(Math.abs(a.Damage))),
			(t = DamageUiManager.Kkt(
				a.ElementId,
				a.IsCure,
				a.Damage,
				a.DamageTextId,
			)) < 0
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						8,
						"[DamageText]产生伤害飘字时，伤害飘字Id无效",
						["textId", t],
						["elementId", a.ElementId],
						["bCure", a.IsCure],
						["damageTextId", a.DamageTextId],
					)
				: (this.DamagePositionCache.DeepCopy(a.DamagePosition),
					(i = this.GetDamageViewData(t))
						? (r = this.ProjectWorldLocationToScreenPosition(
								a.DamagePosition,
							)) &&
							DamageUiManager.Qkt(
								e,
								this.DamagePositionCache,
								r,
								i,
								a.IsCritical,
								a.IsCure,
								a.IsOwnPlayer,
								a.DamageText,
							)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Battle", 8, "找不到对应的伤害飘字配置", [
								"伤害飘字Id",
								t,
							])));
	}
	static Tick(a) {
		for (const e of DamageUiManager.Xkt) e.Tick(a);
		for (let a = 0; a < 1 && !this.jkt.Empty; a++) {
			var e = this.jkt.Pop();
			this.Wkt(e), this.Hkt.push(e);
		}
	}
	static Kkt(a, e, t, i = -1) {
		return i && -1 !== i
			? i
			: 0 === t
				? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT_ID
				: 0 < a
					? a
					: e
						? BattleUiDefine_1.CURE_DAMAGE_TEXT
						: BattleUiDefine_1.ATK_DAMAGE_TEXT;
	}
	static ProjectWorldLocationToScreenPosition(a) {
		var e = Global_1.Global.CharacterController;
		if (
			UE.GameplayStatics.ProjectWorldToScreen(e, a, this.$kt, !1) &&
			(e = (0, puerts_1.$unref)(this.$kt))
		) {
			a = e.X;
			var t = e.Y;
			if (!isNaN(a) && !isNaN(t) && isFinite(a) && isFinite(t)) return e;
		}
	}
	static ScreenPositionToLguiPosition(a) {
		return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
			a,
		);
	}
	static Qkt(a, e, t, i, r = !1, n = !1, o = !1, g = "") {
		let m;
		return (
			0 < this.Fkt.length
				? (m = this.Fkt.pop())
				: ((m = new DamageView_1.DamageView()).Init(),
					this.TotalDamageViewNum++),
			this.Xkt.add(m),
			m.InitializeData(a, e, t, i, r, n, o, g),
			m
		);
	}
	static RemoveDamageView(a) {
		this.Xkt.has(a) && (a.ClearData(), this.Xkt.delete(a), this.Fkt.push(a));
	}
	static OnEditorPlatformChanged() {
		for (const a of DamageUiManager.Xkt) a.RefreshFontSize();
		for (const a of DamageUiManager.Fkt) a.RefreshFontSize();
	}
	static OnLeaveLevel() {
		for (const a of DamageUiManager.Xkt) a.ClearData(), a.Destroy();
		DamageUiManager.Xkt.clear();
		for (const a of DamageUiManager.Fkt) a.Destroy();
		(DamageUiManager.Fkt.length = 0),
			(DamageUiManager.TotalDamageViewNum = 0),
			DamageUiSequencePool_1.DamageUiSequencePool.Clear(),
			DamageUiManager.jkt.Clear(),
			(DamageUiManager.Hkt.length = 0);
	}
	static Clear() {}
}
((exports.DamageUiManager = DamageUiManager).jkt = new Queue_1.Queue()),
	(DamageUiManager.Hkt = []),
	(DamageUiManager.TotalDamageViewNum = 0),
	(DamageUiManager.Xkt = new Set()),
	(DamageUiManager.Fkt = new Array()),
	(DamageUiManager.kkt = new Map()),
	(DamageUiManager.Vkt = !0),
	(DamageUiManager.MinDamageOffsetScale = 0),
	(DamageUiManager.MaxDamageOffsetScale = 0),
	(DamageUiManager.MinDamageOffsetDistance = 0),
	(DamageUiManager.MaxDamageOffsetDistance = 0),
	(DamageUiManager.DamagePositionCache = void 0),
	(DamageUiManager.Okt = void 0),
	(DamageUiManager.$kt = (0, puerts_1.$ref)(void 0));
