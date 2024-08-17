"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	TsSimpleInteractBase_1 = require("./TsSimpleInteractBase"),
	redColor = new UE.LinearColor(1, 0, 0, 1),
	blueColor = new UE.LinearColor(0, 0, 1, 1),
	DRAW_TIME = 0.05,
	DEFAULT_THICKNESS = 4,
	DEFAULT_ARROW_SIZE = 20,
	DRAW_LENGTH = 100,
	forwardOffset = new UE.Vector(100, 0, 0),
	upOffset = new UE.Vector(0, 0, 100),
	textColor = new UE.Color(255, 128, 128, 255),
	TEXT_SIZE = 80,
	PROFILE_KEY = "TsSimpleInteractHookPoint_GetBestTransform";
class TsSimpleInteractHookPoint extends TsSimpleInteractBase_1.default {
	constructor() {
		super(...arguments), (this.TmpLocation = void 0);
	}
	CheckLegal() {
		return !0;
	}
	OnDraw() {
		var t = this.K2_GetActorLocation(),
			e = this.GetTransform();
		UE.KismetSystemLibrary.DrawDebugArrow(
			this,
			t,
			e.TransformPosition(forwardOffset),
			20,
			redColor,
			0.05,
			4,
		),
			UE.KismetSystemLibrary.DrawDebugArrow(
				this,
				t,
				e.TransformPosition(upOffset),
				20,
				blueColor,
				0.05,
				4,
			);
	}
	SetText(t) {
		(this.Text.HorizontalAlignment = 1),
			this.Text.SetWorldSize(80),
			this.Text.SetTextRenderColor(textColor),
			(this.Text.Text = "HookPoint " + this.TypeId);
	}
	OnGetBestTransform(t, e, o, r) {
		return (
			this.ActorLocation.FromUeVector(t.K2_GetActorLocation()),
			this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
			(this.TmpVector1.X = r),
			(this.TmpVector1.Y = 0),
			(this.TmpVector1.Z = 0),
			this.TmpLocation || (this.TmpLocation = Vector_1.Vector.Create()),
			this.SelfTransform.TransformPosition(this.TmpVector1, this.TmpLocation),
			(this.TmpResult.Location = this.TmpLocation.ToUeVector()),
			(this.LineTrace.WorldContextObject = t),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.LineTrace,
				this.ActorLocation,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.LineTrace,
				this.TmpResult.Location,
			),
			(this.TmpResult.Success =
				!TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.LineTrace,
					PROFILE_KEY,
				)),
			(this.LineTrace.WorldContextObject = void 0),
			this.TmpResult.Success,
			this.TmpResult
		);
	}
}
exports.default = TsSimpleInteractHookPoint;
