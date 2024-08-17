"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioModel = exports.AudioBox = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../Actor/ActorSystem"),
	PriorityQueue_1 = require("../Container/PriorityQueue"),
	ModelBase_1 = require("../Framework/ModelBase"),
	MathUtils_1 = require("../Utils/MathUtils");
class AudioBox {
	constructor(e, t, i) {
		(this.Priority = e), (this.PbDataId = t), (this.BoxType = i);
	}
}
(exports.AudioBox = AudioBox).Compare = (e, t) => {
	let i = t.Priority - e.Priority;
	return 0 === i && i--, i;
};
class AudioModel extends ModelBase_1.ModelBase {
	constructor() {
		super(), (this.Q6 = void 0), (this.X6 = void 0);
	}
	static GetSpectrumActor() {
		return (
			AudioModel.Y6 ||
				(AudioModel.Y6 = ActorSystem_1.ActorSystem.Get(
					UE.BP_Wwise_AudioSpectrum_C.StaticClass(),
					MathUtils_1.MathUtils.DefaultTransform,
				)),
			AudioModel.Y6
		);
	}
	static DestroySpectrumActor() {
		AudioModel.Y6 &&
			(ActorSystem_1.ActorSystem.Put(AudioModel.Y6), (AudioModel.Y6 = void 0));
	}
	OnInit() {
		return (
			(this.Q6 = new PriorityQueue_1.PriorityQueue(AudioBox.Compare)),
			(this.X6 = new PriorityQueue_1.PriorityQueue(AudioBox.Compare)),
			!0
		);
	}
	OnClear() {
		return (this.Q6 = void 0), !(this.X6 = void 0);
	}
	UpdateAudioBoxQueue(e, t) {
		let i = void 0,
			r = void 0;
		switch (e.BoxType) {
			case "AudioAMB":
				this.Q6 && !this.Q6.Empty && (i = this.Q6.Top), (r = this.Q6);
				break;
			case "AudioBGM":
				this.X6 && !this.X6.Empty && (i = this.X6.Top), (r = this.X6);
				break;
			default:
				return;
		}
		var o = i === e;
		switch (t) {
			case 0:
				if ((r.Push(e), r.Top === e)) return r.Top;
				break;
			case 1:
				if ((r.Remove(e), o && !r.Empty)) return r.Top;
				break;
			case 2:
				if (o) return r.Top;
				break;
			default:
				return;
		}
	}
}
(exports.AudioModel = AudioModel).Y6 = void 0;
//# sourceMappingURL=AudioModel.js.map
