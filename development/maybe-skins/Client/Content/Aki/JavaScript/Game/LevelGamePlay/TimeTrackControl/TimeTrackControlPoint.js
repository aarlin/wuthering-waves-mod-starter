"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeTrackControlPoint = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	SHOW = "Show",
	HIDE = "Hide";
class TimeTrackControlPoint extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i) {
		super(),
			(this.Index = t),
			(this.hwe = Rotator_1.Rotator.Create(0, i, 0)),
			this.CreateThenShowByActor(e.GetOwner()),
			(this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(e));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		this.GetItem(2).SetUIActive(!0),
			this.GetItem(3).SetUIActive(!1),
			this.hwe &&
				this.GetItem(0)?.SetUIRelativeRotation(this.hwe.ToUeRotator()),
			this.AddEvent();
	}
	HandleDisplay(e) {}
	OnBeforeDestroy() {
		(this.hwe = void 0),
			this.SequencePlayer?.Clear(),
			(this.SequencePlayer = void 0),
			this.RemoveEvent(),
			super.Destroy();
	}
	AddEvent() {}
	RemoveEvent() {}
	UpdateState(e) {
		e
			? (this.GetItem(2).SetUIActive(!0), this.GetItem(3).SetUIActive(!1))
			: (this.GetItem(2).SetUIActive(!1), this.GetItem(3).SetUIActive(!0));
	}
	ToggleSelected(e) {
		this.SequencePlayer &&
			(this.SequencePlayer.StopCurrentSequence(!1, !0),
			e
				? this.SequencePlayer.PlaySequencePurely(SHOW)
				: this.SequencePlayer.PlaySequencePurely(HIDE));
	}
}
exports.TimeTrackControlPoint = TimeTrackControlPoint;
