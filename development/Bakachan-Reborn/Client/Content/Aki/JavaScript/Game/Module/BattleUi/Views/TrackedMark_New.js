"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackedMark = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapDefine_1 = require("../../Map/MapDefine"),
	MapUtil_1 = require("../../Map/MapUtil"),
	PlatformController_1 = require("../../Platform/PlatformController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ModManager_1 = require("../../../Manager/ModManager"),
	BattleUiControl_1 = require("../BattleUiControl"),
	CENTER_Y = 62.5,
	MAX_A = 1176,
	MARGIN_A = 1008,
	MAX_B = 712.5,
	MARGIN_B = 495,
	center = Vector2D_1.Vector2D.Create(0, 62.5),
	RAD_2_DEG = 180 / Math.PI,
	WAVE_COLOR_NEAR = "86FF83",
	WAVE_COLOR_MIDDLE = "FFE683",
	WAVE_COLOR_FAR = "FFFFFF",
	VARNAME_WAVE_CYCLE_TIME = "LifeTime",
	VARNAME_WAVE_NUM_SCALE = "Scale",
	VARNAME_WAVE_COLOR = "Color",
	VARNAME_WAVE_ROTATION = "Rotation",
	DELAY_TIME = 500,
	SUB_SCALE = 0.8,
	QUEST_TRACK_MARK_INDEX = 999;
class TrackedMark extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.TrackTarget = void 0),
			(this.ndt = !1),
			(this.sdt = !1),
			(this.vnt = ""),
			(this.uXe = 0),
			(this.cXe = 0),
			(this._Xe = (0, puerts_1.$ref)(void 0)),
			(this.pXe = Vector2D_1.Vector2D.Create(1, -1)),
			(this._ct = 0),
			(this.adt = 0),
			(this.hdt = 0),
			(this.ldt = 0),
			(this._dt = void 0),
			(this.udt = !1),
			(this.mXe = void 0),
			(this.p$e = void 0),
			(this.cdt = void 0),
			(this.mdt = !1),
			(this.cie = void 0),
			(this.ddt = 0),
			(this.Cdt = -1),
			(this.ShouldShowTrackMark = !0),
			(this.gdt = void 0),
			(this.fdt = 0),
			(this.pdt = !1),
			(this.vdt = !1),
			(this.Mdt = void 0),
			(this.Sdt = void 0),
			(this.Edt = void 0),
			(this.ydt = void 0),
			(this.Idt = !1),
			(this.Tdt = -0),
			(this.Ldt = -0),
			(this.Ddt = -0),
			(this.Rdt = -0),
			(this.Udt = !1),
			(this.Adt = !1),
			(this.Pdt = !1),
			(this.xdt = !1),
			(this.wdt = 0),
			(this.Bdt = 0),
			(this.bdt = 0),
			(this.qdt = 0),
			(this.jat = () => {
				var t = MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(
					this.TrackTarget,
					!0,
				);
				t && BattleUiControl_1.BattleUiControl.FocusToTargetLocation(t);
			}),
			(this.lut = (t) => {
				"Start" === t && (this.vdt = !1);
			}),
			(this.Gdt = (t) => {
				t !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest ||
					this.udt ||
					this.Ndt();
			}),
			(this.Odt = (t, e, i) => {
				6 === t.Type &&
					t.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
					this.Ndt();
			}),
			(this.kdt = (t) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Map",
						40,
						"[TrackedMark] [疑难杂症] 播放点声源特效",
						["MarkId", this.hdt],
						["EffectDuration", t],
						["TrackType", this.wdt],
						["UIActiveSelf", this.RootItem?.IsUIActiveSelf()],
					),
					1 !== this.wdt ||
						t <= 0 ||
						(this.RootItem.IsUIActiveSelf() &&
							(this.Fdt(),
							(this.Tdt = t / CommonDefine_1.MILLIONSECOND_PER_SECOND),
							(this.Ldt = 0),
							(this.Idt = !0)));
			}),
			(this.Ndt = () => {
				var t;
				if (
					(this.gdt &&
						((t = this.gdt.GetCurrentSequence()),
						this.xdt
							? ("Start" !== t && this.gdt.PlayLevelSequenceByName("Start"),
								this.gdt.StopCurrentSequence(!0, !0))
							: "Start" !== t &&
								this.Edt.bIsUIActive &&
								((this.Ddt = 0), this.gdt.PlayLevelSequenceByName("Start"))),
					this.TrackTarget && ModManager_1.ModManager.Settings.QuestTP)
				) {
					var e = MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(
						this.TrackTarget,
						!0,
					);
					ModManager_1.ModManager.TpNoloadingTo(e.X, e.Y, e.Z);
				}
			}),
			(this.Vdt = (t, e, i, a, r) => {
				t === this.ldt &&
					a === this.hdt &&
					((this.udt = r), this.Edt?.SetUIActive(!r));
			}),
			GlobalData_1.GlobalData.World &&
				((this.ldt = t.TrackSource),
				(this.vnt = t.IconPath),
				(this.adt = t.ShowGroupId),
				(this.hdt = t.Id),
				(this._ct = t.TrackHideDis),
				(this.TrackTarget = t.TrackTarget),
				(this.udt = t.IsInTrackRange ?? !1),
				(this.pdt = t.AutoHideTrack ?? !1),
				(this.Rdt =
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"QuestMarkTrackStayTime",
					) ?? 10),
				(this.fdt = t.Offset?.Z ?? 0),
				(this.Tdt = 0),
				(this.Ldt = 0),
				(this.Idt = !1),
				(this.ndt = t.IsSubTrack ?? !1),
				(this.wdt = t.TrackType ?? 0),
				1 === this.wdt
					? ((this.Udt = !0),
						(this.Adt = !0),
						(this.xdt = !0),
						(this.Pdt = !0),
						(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
							this.hdt,
						)?.Entity?.GetComponent(144)),
						(this.Bdt =
							(t?.AudioPointNearRadius ?? 0) * MapDefine_1.FLOAT_0_01),
						(this.bdt =
							(t?.AudioPointMiddleRadius ?? 0) * MapDefine_1.FLOAT_0_01),
						(this.qdt = (t?.AudioPointFarRadius ?? 0) * MapDefine_1.FLOAT_0_01))
					: ((this.Udt = !1),
						(this.Adt = !1),
						(this.xdt = !1),
						(this.Pdt = !1)),
				(this.mXe = Vector_1.Vector.Create()),
				(this.p$e = Vector2D_1.Vector2D.Create()),
				(this.cdt = Vector2D_1.Vector2D.Create()),
				(this.cie = Rotator_1.Rotator.Create()),
				(t = UiLayer_1.UiLayer.UiRootItem),
				(this.uXe = Math.min(1176, ((t?.GetWidth() ?? 0) - 1008) / 2)),
				(this.cXe = Math.min(712.5, ((t?.GetHeight() ?? 0) - 495) / 2)),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.TaskRangeTrackStateChange,
					this.Vdt,
				));
	}
	Initialize(t, e) {
		this.CreateThenShowByResourceIdAsync(t, e, !0);
	}
	CreateMark() {
		(this.vdt = !0), this.Ndt();
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UINiagara],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.jat]]);
	}
	OnStart() {
		(this.Mdt = this.GetItem(4)),
			(this.Sdt = this.GetItem(2)),
			(this.Edt = this.GetItem(6)),
			this.Mdt.SetUIActive(!this.udt && !this.Udt),
			this.Sdt.SetUIActive(!this.udt && !this.Adt),
			this.Edt.SetUIActive(!1),
			(this.gdt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.gdt.BindSequenceCloseEvent(this.lut),
			(this.ydt = this.GetUiNiagara(5)),
			this.ydt.SetUIActive(!1),
			this.vnt && this.SetSpriteByPath(this.vnt, this.GetSprite(0), !1),
			this.Edt.SetUIActive(!this.udt && !this.Pdt),
			5 === this.ldt && this.RootItem?.SetHierarchyIndex(999),
			this.CreateMark(),
			this.OnUiShow();
	}
	OnBeforeDestroy() {
		(this.TrackTarget = void 0),
			(this.pXe = void 0),
			this.gdt?.Clear(),
			(this.gdt = void 0),
			TimerSystem_1.TimerSystem.Has(this._dt) &&
				TimerSystem_1.TimerSystem.Remove(this._dt),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.TaskRangeTrackStateChange,
				this.Vdt,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.TaskRangeTrackStateChange,
					this.Vdt,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.Odt,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
					this.Odt,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
					this.Gdt,
				);
	}
	OnUiShow() {
		var t;
		1 === this.wdt &&
			(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.hdt)) &&
			!EventSystem_1.EventSystem.HasWithTarget(
				t.Entity,
				EventDefine_1.EEventName.PlaySoundTrackEffect,
				this.kdt,
			) &&
			EventSystem_1.EventSystem.AddWithTarget(
				t.Entity,
				EventDefine_1.EEventName.PlaySoundTrackEffect,
				this.kdt,
			),
			(this._dt = TimerSystem_1.TimerSystem.Delay(this.Ndt, 500)),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.Odt,
			) ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
					this.Odt,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			) ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
					this.Gdt,
				),
			this.ndt
				? this.RootItem?.SetRelativeScale3D(new UE.Vector(0.8, 0.8, 0.8))
				: this.RootItem?.SetRelativeScale3D(new UE.Vector(1, 1, 1));
	}
	OnUiHide() {
		var t;
		1 === this.wdt &&
			(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.hdt)) &&
			EventSystem_1.EventSystem.HasWithTarget(
				t.Entity,
				EventDefine_1.EEventName.PlaySoundTrackEffect,
				this.kdt,
			) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				t.Entity,
				EventDefine_1.EEventName.PlaySoundTrackEffect,
				this.kdt,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.Odt,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
					this.Odt,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
					this.Gdt,
				);
	}
	UpdateTrackTarget(t) {
		this.TrackTarget = t;
	}
	SetVisibleByOccupied(t) {
		this.sdt = t;
	}
	UpdateTrackDistance() {
		var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
		t &&
			(MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(
				this.TrackTarget,
				!0,
				this.mXe,
			),
			this.fdt && (this.mXe.Z += this.fdt),
			(t = Vector_1.Vector.Distance(t, this.mXe) * MapDefine_1.FLOAT_0_01),
			(this.ddt = t),
			ModelManager_1.ModelManager.TrackModel.UpdateGroupMinDistance(
				this.adt,
				t,
			));
	}
	Update(t) {
		var e;
		GlobalData_1.GlobalData.World
			? UiLayer_1.UiLayer.UiRootItem
				? this.RootItem &&
					((this.Ddt += t / CommonDefine_1.MILLIONSECOND_PER_SECOND),
					this.Hdt()
						? (e = this.ddt) < this._ct && !this.vdt
							? (this.RootItem.SetUIActive(!1), 1 === this.wdt && this.Fdt())
							: (this.RootItem.SetUIActive(!0),
								this.jdt(t),
								!this.mdt || this.udt || this.Udt
									? this.Mdt.SetUIActive(!1)
									: ((e = Math.round(e)),
										this.Cdt !== e &&
											((this.Cdt = e),
											LguiUtil_1.LguiUtil.SetLocalTextNew(
												this.GetText(1),
												"Text_Meter_Text",
												this.Cdt.toString(),
											)),
										this.Mdt.SetUIActive(!0)),
								1 === this.wdt && this.Wdt(t),
								this.Edt.SetUIActive(!this.udt && !this.Pdt))
						: this.RootItem.SetUIActive(!1))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Map",
						50,
						"【疑难杂症】标记固定在屏幕中心，RootItem为空",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Map",
					50,
					"【疑难杂症】标记固定在屏幕中心，GameWorld为空",
				);
	}
	jdt(t) {
		var e,
			i = Global_1.Global.CharacterController,
			a = this.mXe.ToUeVector(),
			r = UE.GameplayStatics.ProjectWorldToScreen(i, a, this._Xe);
		r ||
			(((a = (e =
				ModelManager_1.ModelManager.CameraModel
					.CameraTransform).InverseTransformPositionNoScale(a)).X = -a.X),
			(e = e.TransformPositionNoScale(a)),
			UE.GameplayStatics.ProjectWorldToScreen(i, e, this._Xe)),
			(a = (0, puerts_1.$unref)(this._Xe));
		this.p$e.Set(a.X, a.Y),
			(this.cdt.Equals(this.p$e, 1) && !this.Idt) ||
				(this.cdt.DeepCopy(this.p$e),
				(i = ModelManager_1.ModelManager.BattleUiModel),
				PlatformController_1.PlatformController.IsMobile() ||
					i.UpdateViewPortSize(),
				this.p$e
					.MultiplyEqual(i.ScreenPositionScale)
					.AdditionEqual(i.ScreenPositionOffset)
					.MultiplyEqual(this.pXe),
				(this.mdt = this.PXe(this.p$e, r)),
				(e = this.p$e.AdditionEqual(center)),
				this.RootItem.SetAnchorOffset(e.ToUeVector2D()),
				this.mdt || this.udt || this.Adt
					? this.Sdt.SetUIActive(!1)
					: (this.cie.Reset(),
						(this.cie.Yaw = Math.atan2(this.p$e.Y, this.p$e.X) * RAD_2_DEG),
						this.Sdt.SetUIRelativeRotation(this.cie.ToUeRotator()),
						this.Sdt.SetUIActive(!0)),
				this.mdt || 1 !== this.wdt
					? this.ydt.SetNiagaraVarFloat("Rotation", 0.25)
					: ((a = Math.atan2(this.p$e.Y, this.p$e.X) / (2 * Math.PI)),
						this.ydt.SetNiagaraVarFloat("Rotation", a)));
	}
	MoveTowards(t, e, i) {
		var a = e.X - t.X,
			r = ((e = e.Y - t.Y), Math.sqrt(a * a + e * e));
		(e = Math.atan2(e, a)), (a = (i * Math.abs(r)) / (r + 1));
		return new Vector2D_1.Vector2D(
			t.X + a * Math.cos(e),
			t.Y + a * Math.sin(e),
		);
	}
	Hdt() {
		return (
			!this.sdt &&
			!(this.pdt && this.Ddt > this.Rdt) &&
				!(
					!ModelManager_1.ModelManager.TrackModel.CanShowInGroup(
						this.adt,
						this.ddt,
					) || !this.ShouldShowTrackMark
				) &&
					!(
						"number" == typeof this.TrackTarget &&
						!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
							this.TrackTarget,
						)
					) &&
			(ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				? !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					(ModelManager_1.ModelManager.TrackModel.IsTracking(2, this.hdt) ||
						ModelManager_1.ModelManager.TrackModel.IsTracking(4, this.hdt))
				: ModelManager_1.ModelManager.TrackModel.IsTracking(this.ldt, this.hdt))
		);
	}
	PXe(t, e) {
		var i = t.X,
			a = t.Y,
			r = this.uXe,
			s = this.cXe;
		return (
			!!(e && (i * i) / (r * r) + (a * a) / (s * s) <= 1) ||
			((e = (r * s) / Math.sqrt(s * s * i * i + r * r * a * a)),
			t.MultiplyEqual(e),
			!1)
		);
	}
	Wdt(t) {
		1 === this.wdt &&
			(this.ydt.IsUIActiveSelf() || this.Idt) &&
			(this.Idt &&
				((this.Idt = !1),
				this.ydt.SetNiagaraVarFloat("LifeTime", this.Tdt),
				this.ddt <= this.Bdt
					? (this.ydt.SetNiagaraVarFloat("Scale", 1),
						this.ydt.SetNiagaraVarLinearColor(
							"Color",
							new UE.LinearColor(UE.Color.FromHex("86FF83")),
						))
					: this.ddt > this.Bdt && this.ddt <= this.bdt
						? (this.ydt.SetNiagaraVarFloat("Scale", 2 / 3),
							this.ydt.SetNiagaraVarLinearColor(
								"Color",
								new UE.LinearColor(UE.Color.FromHex("FFE683")),
							))
						: this.ddt > this.bdt &&
							this.ddt <= this.qdt &&
							(this.ydt.SetNiagaraVarFloat("Scale", 1 / 3),
							this.ydt.SetNiagaraVarLinearColor(
								"Color",
								new UE.LinearColor(UE.Color.FromHex("FFFFFF")),
							)),
				this.ydt.SetNiagaraUIActive(!0, !1),
				this.ydt.ActivateSystem(!1)),
			this.Ldt >= this.Tdt
				? this.Fdt()
				: (this.Ldt += t / CommonDefine_1.MILLIONSECOND_PER_SECOND));
	}
	Fdt() {
		this.ydt.SetNiagaraUIActive(!1, !0),
			this.ydt.DeactivateSystem(),
			(this.Tdt = 0),
			(this.Ldt = 0),
			(this.Idt = !1);
	}
}
exports.TrackedMark = TrackedMark;
