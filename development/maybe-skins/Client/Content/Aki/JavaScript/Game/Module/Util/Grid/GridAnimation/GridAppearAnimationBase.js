"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GridAppearAnimationBase = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	PerformanceController_1 = require("../../../../../Core/Performance/PerformanceController"),
	TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class GridAppearAnimationBase {
	constructor(e) {
		(this.GridPreserver = void 0),
			(this.tqo = void 0),
			(this.DisplayGridNum = 0),
			(this.Xje = TickSystem_1.TickSystem.InvalidId),
			(this.IsInGridAppearAnimation = !1),
			(this.HasShowFirstGrid = !1),
			(this.iqo = new Map()),
			(this.Zmt = () => {
				this.GridPreserver.NotifyAnimationEnd();
			}),
			(this.Tick = (e) => {
				var i = PerformanceController_1.PerformanceController.StartMonitor(
					"GridAppearAnimationBase.Tick",
				);
				this.OnUpdate(e),
					PerformanceController_1.PerformanceController.EndMonitor(i);
			}),
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ScrollViewGrid",
						25,
						"设置错误，gridPreserver为空!",
					)),
			(this.GridPreserver = e);
	}
	IsGridControlValid() {
		return !this.IsInGridAppearAnimation;
	}
	PlayGridAnim(e, i = !1) {
		this.tqo
			? (this.GridPreserver.NotifyAnimationStart(), this.tqo.Play("", e, i))
			: this.GridPreserver.GetGridAnimationInterval() <= 0 &&
					this.GridPreserver.GetGridAnimationStartTime() <= 0
				? this.GridPreserver.NotifyAnimationEnd()
				: (this.oqo(), this.il());
	}
	Clear() {
		this.tqo
			? (this.tqo.OnFinish.Unbind(), this.GridPreserver.NotifyAnimationEnd())
			: (this.GridPreserver.GetGridAnimationInterval() <= 0 &&
					this.GridPreserver.GetGridAnimationStartTime() <= 0) ||
				this.oqo();
	}
	RegisterAnimController() {
		(this.tqo = this.GridPreserver.GetUiAnimController()),
			this.tqo &&
				(this.tqo.SetTickableWhenPaused(!0), this.tqo.OnFinish.Bind(this.Zmt));
	}
	oqo() {
		this.GridPreserver.NotifyAnimationEnd(),
			this.RemoveTimer(),
			this.OnInterrupt();
	}
	il() {
		(this.DisplayGridNum = this.GridPreserver.GetDisplayGridNum()),
			this.rqo(),
			this.OnStart();
	}
	OnStart() {}
	OnUpdate(e) {}
	GridsForEach(e) {
		var i = this.GridPreserver.GetPreservedGridNum() - 1;
		for (let r = 0; r <= i; r++) {
			e(r, this.GridPreserver.GetGridByDisplayIndex(r));
		}
	}
	End() {
		this.RemoveTimer(), this.OnEnd();
	}
	OnEnd() {}
	OnInterrupt() {
		for (const e of this.iqo.values()) e.StopSequenceByKey("Start"), e.Clear();
		this.iqo.clear();
	}
	ShowGrid(e, i) {
		e.SetUIActive(!0);
		let r = this.iqo.get(e);
		r ||
			((r = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
			this.iqo.set(e, r)),
			r.StopSequenceByKey("Start"),
			r.PlayLevelSequenceByName("Start"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnShowGridAnimation,
				i,
				e,
			);
	}
	rqo() {
		this.Xje === TickSystem_1.TickSystem.InvalidId &&
			(this.Xje = TickSystem_1.TickSystem.Add(
				this.Tick,
				"GridAppearAnimation",
				0,
				!0,
			).Id);
	}
	RemoveTimer() {
		this.Xje !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.Xje),
			(this.Xje = TickSystem_1.TickSystem.InvalidId));
	}
}
exports.GridAppearAnimationBase = GridAppearAnimationBase;
