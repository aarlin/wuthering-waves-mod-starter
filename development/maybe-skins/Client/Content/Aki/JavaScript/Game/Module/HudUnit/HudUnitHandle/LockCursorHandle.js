"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockCursorHandle = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	BattleUiControl_1 = require("../../BattleUi/BattleUiControl"),
	LockCursorUnit_1 = require("../HudUnit/LockCursorUnit"),
	HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
	HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.xHs = new Vector2D_1.Vector2D()),
			(this.Aii = void 0),
			(this.aXe = !1),
			(this.Pii = !1),
			(this.xii = !1),
			(this.wii = 0),
			(this.Bii = (e, t) => {
				ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					(0 === t ? (this.xii = void 0 !== this.Aii) : (this.Pii = !0)),
					this.Aii &&
						!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
							185,
						)?.HasTag(-2140742267) &&
						(0 === t ? this.bii() : this.qii());
			}),
			(this.Gii = (e, t) => {
				102 === t && (e ? this.bii() : this.qii());
			}),
			(this.AYe = (e, t) => {
				e ? (this.wii = t) : t === this.wii && (this.wii = 0);
			});
	}
	OnAddEvents() {
		InputDistributeController_1.InputDistributeController.BindAction(
			InputMappingsDefine_1.actionMappings.锁定目标,
			this.Bii,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
				this.Gii,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
				this.AYe,
			);
	}
	OnRemoveEvents() {
		InputDistributeController_1.InputDistributeController.UnBindAction(
			InputMappingsDefine_1.actionMappings.锁定目标,
			this.Bii,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
				this.Gii,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
				this.AYe,
			);
	}
	OnDestroyed() {
		this.Aii = void 0;
	}
	bii() {
		var e, t;
		this.Aii &&
			((t = (e =
				ModelManager_1.ModelManager.SceneTeamModel
					.GetCurrentEntity).Entity.GetComponent(185)),
			(e = e.Entity.GetComponent(52)),
			t.HasTag(-1150819426)) &&
			((t =
				e.BpInputComp.UnlockLongPressTime *
				TimeUtil_1.TimeUtil.InverseMillisecond),
			this.Aii.ActivateUnlockTimeDown(t));
	}
	qii() {
		this.Aii?.DeactivateUnlockTimeDown();
	}
	OnTick(e) {
		var t;
		super.OnTick(e),
			this.aXe ||
				((e = this.GetTargetInfo()),
				this.Pii &&
					((this.Pii = !1),
					this.xii ||
						e.ShowTarget ||
						this.Nii() ||
						BattleUiControl_1.BattleUiControl.ResetFocus()),
				e &&
				e.ShowTarget?.Valid &&
				e.ShowTarget.Id !== this.wii &&
				(t = this.GetWorldLocation()) &&
				HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
					t,
					this.xHs,
				)
					? (this.Activate(),
						this.Aii &&
							(this.Aii.UpdateShowTargetState(e.ShowTarget),
							this.Aii.RefreshManualLockVisible(),
							this.Aii.GetRootItem().SetAnchorOffset(
								this.xHs.ToUeVector2D(!0),
							)))
					: this.Deactivate());
	}
	Nii() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		return (
			!!e?.Valid &&
			e.Entity.GetComponent(158)?.DirectionState ===
				CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
		);
	}
	Activate() {
		this.Aii
			? this.Aii.Activate()
			: this.aXe ||
				((this.aXe = !0),
				this.NewHudUnit(LockCursorUnit_1.LockCursorUnit, "UiItem_SuoDing").then(
					(e) => {
						e && ((this.aXe = !1), (this.Aii = e));
					},
					() => {},
				));
	}
	Deactivate() {
		this.Aii && this.Aii.Deactivate();
	}
	GetTargetInfo() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (e?.Valid) return e.Entity.CheckGetComponent(29).GetTargetInfo();
	}
	GetWorldLocation() {
		var e = this.GetTargetInfo();
		if (e) {
			var t = e.ShowTarget;
			if (
				t?.Valid &&
				(t = t.Entity.GetComponent(1).Owner) instanceof
					TsBaseCharacter_1.default
			) {
				t = t.Mesh;
				let i = FNameUtil_1.FNameUtil.GetDynamicFName(e.SocketName);
				return (
					(i && t.DoesSocketExist(i)) || (i = HIT_CASE_SOCKET),
					t.GetSocketLocation(i)
				);
			}
		}
	}
}
exports.LockCursorHandle = LockCursorHandle;
