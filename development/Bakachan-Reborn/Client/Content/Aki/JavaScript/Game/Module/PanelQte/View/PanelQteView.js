"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PanelQteView = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../Core/Common/Time"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	PanelQteController_1 = require("../PanelQteController"),
	CAMERA_SHAKE_OUTER_RADIUS = 500,
	MIN_BUFF_CD = 1e3;
class PanelQteView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.IsMobile = !1),
			(this.IsPause = !1),
			(this.IsQteStart = !0),
			(this.IsQteEnd = !1),
			(this.CameraShakeOnInput = !1),
			(this.LoadCameraShakeHandleId =
				ResourceSystem_1.ResourceSystem.InvalidId),
			(this.CameraShakeType = void 0),
			(this.BuffId = void 0),
			(this.BuffCd = 0),
			(this.BuffEnableTime = 0),
			(this.MJt = () => {
				this.RefreshVisible();
			}),
			(this.JDe = () => {
				this.IsPause = !1;
			}),
			(this.ZDe = () => {
				this.IsPause = !0;
			}),
			(this.VNi = (e) => {
				this.OpenParam === e && ((this.IsQteEnd = !0), this.HandleQteEnd());
			}),
			(this.dKe = (e, t, a) => {
				this.OnPlatformChangedInner(e);
			});
	}
	OnRegisterComponent() {
		this.IsMobile = ModelManager_1.ModelManager.PlatformModel.IsMobile();
	}
	OnAfterShow() {
		this.RefreshVisible();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ActiveBattleView,
			this.JDe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DisActiveBattleView,
				this.ZDe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PanelQteEnd,
				this.VNi,
			),
			this.IsMobile ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
				20,
				this.MJt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ActiveBattleView,
			this.JDe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.DisActiveBattleView,
				this.ZDe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PanelQteEnd,
				this.VNi,
			),
			this.IsMobile ||
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
				20,
				this.MJt,
			);
	}
	RefreshVisible() {
		var e =
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
				20,
			);
		this.SetActive(e);
	}
	HandleQteEnd() {}
	OnPlatformChangedInner(e) {}
	OnTick(e) {
		this.IsPause ||
			(this.IsQteStart &&
				!this.IsQteEnd &&
				ModelManager_1.ModelManager.PanelQteModel.UpdateTime(e));
	}
	OnBeforeDestroy() {
		var e;
		this.ClearCameraShake(),
			this.ClearBuff(),
			ModelManager_1.ModelManager.PanelQteModel.IsInQte &&
				(e = this.OpenParam) ===
					ModelManager_1.ModelManager.PanelQteModel.GetContext().QteHandleId &&
				PanelQteController_1.PanelQteController.StopQte(e, !0);
	}
	InitCameraShake(e) {
		(this.CameraShakeOnInput = e.CameraShakeOnInput),
			this.CameraShakeOnInput &&
				(this.LoadCameraShakeHandleId =
					ResourceSystem_1.ResourceSystem.LoadAsync(
						e.CameraShakeType.ToAssetPathName(),
						UE.Class,
						(e) => {
							(this.CameraShakeType = e),
								(this.LoadCameraShakeHandleId =
									ResourceSystem_1.ResourceSystem.InvalidId);
						},
					));
	}
	PlayCameraShake() {
		var e;
		this.CameraShakeType &&
			((e = ModelManager_1.ModelManager.CameraModel.CameraLocation),
			CameraController_1.CameraController.PlayWorldCameraShake(
				this.CameraShakeType,
				e.ToUeVector(),
				0,
				500,
				1,
				!1,
			));
	}
	ClearCameraShake() {
		(this.CameraShakeOnInput = !1),
			(this.CameraShakeType = void 0),
			this.LoadCameraShakeHandleId !==
				ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(
					this.LoadCameraShakeHandleId,
				),
				(this.LoadCameraShakeHandleId =
					ResourceSystem_1.ResourceSystem.InvalidId));
	}
	InitBuff(e) {
		(this.BuffId = e.BuffOnInput),
			(this.BuffCd = Math.max(
				e.BuffCd * TimeUtil_1.TimeUtil.InverseMillisecond,
				1e3,
			));
	}
	AddBuff() {
		var e, t, a;
		this.BuffId &&
			!(Time_1.Time.WorldTime < this.BuffEnableTime) &&
			((this.BuffEnableTime = Time_1.Time.WorldTime + this.BuffCd),
			(t = (e =
				ModelManager_1.ModelManager.PanelQteModel.GetContext()).GetSourceEntity())) &&
			((a = t.GetComponent(0).GetCreatureDataId()),
			t.GetComponent(157)?.AddBuff(this.BuffId, {
				InstigatorId: a,
				Reason: "界面QTE输入时添加",
				PreMessageId: e.PreMessageId,
			}));
	}
	ClearBuff() {
		this.BuffId = void 0;
	}
}
exports.PanelQteView = PanelQteView;
