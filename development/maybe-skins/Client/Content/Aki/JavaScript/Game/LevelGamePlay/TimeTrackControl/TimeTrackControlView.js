"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeTrackControlView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LongPressButtonItem_1 = require("../../Module/Common/Button/LongPressButtonItem"),
	SceneTeamEvent_1 = require("../../Module/SceneTeam/SceneTeamEvent"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	TimeTrackController_1 = require("./TimeTrackController"),
	TimeTrackControlPoint_1 = require("./TimeTrackControlPoint"),
	ANGLE_RANGE = 26,
	ANGLE_MIN = -13,
	ANGLE_MAX = 13,
	LOOP_AKEVENT = "play_ui_com_time_loop",
	HIGHLIGHT_AKEVENT = "play_ui_com_time_bell";
class TimeTrackControlView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.lwe = void 0),
			(this._we = 0),
			(this.uwe = void 0),
			(this.cwe = 0),
			(this.mwe = -0),
			(this.dwe = 0),
			(this.Cwe = 0),
			(this.gwe = -0),
			(this.fwe = -0),
			(this.pwe = -0),
			(this.vwe = !1),
			(this.Mwe = !1),
			(this.IAr = !1),
			(this.Swe = -0),
			(this.Ewe = void 0),
			(this.ywe = void 0),
			(this.Iwe = void 0),
			(this.Twe = void 0),
			(this.Lwe = (e, t) => {
				0 === e.CalculateType &&
					(TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
					(this.IAr = !0),
					this.CloseMe());
			}),
			(this.Dwe = (e, t) => {
				t === Protocol_1.Aki.Protocol.lkn.Proto_ErrTimelineMove
					? this.Rwe()
					: this.dwe !== e &&
						(this.uwe && this.uwe[this.dwe].ToggleSelected(!1),
						(this.dwe = e),
						(this.fwe = this.Uwe(e)),
						(this.pwe =
							(this.fwe - this.gwe) /
							this.Swe /
							CommonDefine_1.MILLIONSECOND_PER_SECOND),
						(this.vwe = !0),
						AudioSystem_1.AudioSystem.PostEvent(LOOP_AKEVENT));
			}),
			(this.Awe = () => {
				TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
					(this.Mwe = !0),
					this.CloseMe();
			}),
			(this.Pwe = () => {
				this.xwe(!0);
			}),
			(this.wwe = () => {
				this.xwe(!1);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UISprite],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UISprite],
		]),
			(this.BtnBindInfo = [[7, this.Awe]]);
	}
	OnStart() {
		(this.cwe = 26),
			(this.Cwe =
				ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigStatesCounts()),
			(this.Swe =
				ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigSegmentTime()),
			(this._we = this.Cwe - 2 ? this.Cwe - 2 : 0),
			this._we ? this.Bwe() : ((this.mwe = this.cwe), (this._we = 0)),
			(this.dwe =
				ModelManager_1.ModelManager.TimeTrackControlModel.ControlPoint),
			(this.gwe = this.Uwe(this.dwe)),
			(this.Ewe = this.GetItem(5)),
			(this.ywe = Rotator_1.Rotator.Create(0, this.gwe, 0)),
			this.Ewe.SetUIRelativeRotation(this.ywe.ToUeRotator()),
			(this.vwe = !1);
		var e = this.GetItem(4);
		(this.lwe = this.GetItem(3)), (this.uwe = new Array()), e.SetUIActive(!1);
		for (let o = 0; o < this.Cwe; o++) {
			var t,
				i =
					((t = LguiUtil_1.LguiUtil.CopyItem(e, this.lwe)).SetUIActive(!0),
					this.Uwe(o));
			(t = new TimeTrackControlPoint_1.TimeTrackControlPoint(
				t,
				o,
				i,
			)).UpdateState(
				ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(
					o,
				),
			),
				this.uwe.push(t);
		}
		this.uwe[this.dwe].ToggleSelected(!0),
			this.bwe(),
			(this.Iwe = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetButton(0),
				4,
				() => {
					this.wwe();
				},
			)),
			(this.Twe = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetButton(1),
				4,
				() => {
					this.Pwe();
				},
			));
	}
	Bwe() {
		this.mwe = this.cwe / (this._we + 1);
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnTimeTrackControlUpdate,
			this.Dwe,
		);
	}
	OnAfterHide() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTimeTrackControlUpdate,
			this.Dwe,
		);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.HasWithTarget(
			SceneTeamEvent_1.SceneTeam.Local,
			EventDefine_1.EEventName.CharBeHitLocal,
			this.Lwe,
		) ||
			EventSystem_1.EventSystem.AddWithTarget(
				SceneTeamEvent_1.SceneTeam.Local,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.Lwe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.HasWithTarget(
			SceneTeamEvent_1.SceneTeam.Local,
			EventDefine_1.EEventName.CharBeHitLocal,
			this.Lwe,
		) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				SceneTeamEvent_1.SceneTeam.Local,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.Lwe,
			);
	}
	OnBeforeDestroy() {
		this.Iwe?.Clear(),
			this.Twe?.Clear(),
			this.uwe.forEach((e) => {
				e.Destroy();
			}),
			(this.uwe = void 0),
			AudioSystem_1.AudioSystem.ExecuteAction(LOOP_AKEVENT, 0),
			this.Mwe ||
				this.IAr ||
				TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose();
	}
	OnTick(e) {
		this.vwe &&
			((e *= this.pwe),
			(this.gwe += e),
			Math.abs(this.fwe - this.gwe) < Math.abs(e) && this.qwe(),
			(this.ywe.Yaw = this.gwe),
			this.Ewe.SetUIRelativeRotation(this.ywe.ToUeRotator()));
	}
	qwe() {
		if (
			((this.gwe = this.fwe),
			(this.ywe.Yaw = this.gwe),
			this.Ewe.SetUIRelativeRotation(this.ywe.ToUeRotator()),
			AudioSystem_1.AudioSystem.ExecuteAction(LOOP_AKEVENT, 0),
			(this.vwe = !1),
			this.uwe)
		) {
			this.uwe[this.dwe].ToggleSelected(!0);
			for (const t of this.uwe) {
				var e =
					ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(
						t.Index,
					);
				t.UpdateState(e),
					e && AudioSystem_1.AudioSystem.PostEvent(HIGHLIGHT_AKEVENT);
			}
			this.bwe();
		}
	}
	Uwe(e) {
		return MathUtils_1.MathUtils.RangeClamp(e * this.mwe, 0, 26, -13, 13);
	}
	xwe(e) {
		this.vwe ||
			(ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated &&
				(e
					? this.dwe < this.Cwe - 1 &&
						TimeTrackController_1.TimeTrackController.TimelineTraceControlRequest(
							!0,
						)
					: 0 < this.dwe &&
						TimeTrackController_1.TimeTrackController.TimelineTraceControlRequest(
							!1,
						)));
	}
	Rwe() {
		this.UiViewSequence.PlaySequencePurely("Shake", !0, !1);
	}
	bwe() {
		let e = this.dwe,
			t = this.dwe;
		for (
			e -= 1;
			0 <= e &&
			ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(e);
			e--
		);
		var i;
		for (
			0 <= e
				? ((i = (e + 1) / (this.Cwe - 1)),
					this.GetSprite(2).SetUIActive(!0),
					this.GetSprite(2).SetFillAmount(i))
				: this.GetSprite(2).SetUIActive(!1),
				t += 1;
			t < this.Cwe &&
			ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(t);
			t++
		);
		t < this.Cwe
			? ((i = (this.Cwe - t) / (this.Cwe - 1)),
				this.GetSprite(8).SetUIActive(!0),
				this.GetSprite(8).SetFillAmount(i))
			: this.GetSprite(8).SetUIActive(!1);
	}
}
exports.TimeTrackControlView = TimeTrackControlView;
