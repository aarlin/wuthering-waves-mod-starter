"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowAssistant = void 0);
const FlowSequence_1 = require("../../Flow/FlowSequence"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class FlowAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	PreAllPlay() {
		(this.Model.SubSeqLen = this.Model.SequenceData.剧情资源.Num()),
			(this.Model.LastIndex = 0),
			(this.Model.SubSeqIndex = 0),
			(this.Model.NextIndex = 0);
	}
	PreEachPlay() {
		this.Model.NextIndex++,
			this.Model.NextIndex === this.Model.SubSeqLen &&
				(this.Model.NextIndex = FlowSequence_1.FINISH_INDEX);
	}
	EachStop() {
		(this.Model.LastIndex = this.Model.SubSeqIndex),
			(this.Model.SubSeqIndex = this.Model.NextIndex);
	}
	SetNextSequenceIndex(e) {
		this.Model.NextIndex = e;
	}
}
exports.FlowAssistant = FlowAssistant;
