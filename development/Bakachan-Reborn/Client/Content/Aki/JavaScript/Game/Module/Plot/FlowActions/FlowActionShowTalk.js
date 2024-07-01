"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionShowTalk = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../Abilities/FormationDataController"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionShowTalk extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		switch (
			((this.Context.CurShowTalk = this.ActionInfo.Params),
			(this.Context.CurShowTalkActionId = this.ActionInfo.ActionId),
			this.Context.OptionsHistory.set(
				this.Context.CurShowTalkActionId,
				new Map(),
			),
			this.Context.OptionsCollection.push([
				this.Context.CurShowTalkActionId.toString(),
				[],
			]),
			ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)
		) {
			case "LevelA":
			case "LevelB":
				this.l$i();
				break;
			case "LevelC":
				this._$i();
				break;
			case "LevelD":
			case "Prompt":
				FormationDataController_1.FormationDataController.GlobalIsInFight &&
				ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipTalkWhenFighting
					? this.FinishExecute(!0)
					: this._$i();
		}
	}
	_$i() {
		var t = this.ActionInfo.Params,
			e = this.Context,
			o = this.Runner;
		this.FinishExecute(!0, !1), o.FlowShowTalk.Start(t, e);
	}
	l$i() {
		var t, e, o;
		this.Context.IsBackground
			? this._$i()
			: (t = this.ActionInfo.Params)?.SequenceDataAsset
				? ((e = this.Runner),
					(o = this.Context),
					this.FinishExecute(!0, !1),
					e.FlowSequence.Init(t, o),
					e.FlowSequence.Start())
				: this.FinishExecute(!0);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
}
exports.FlowActionShowTalk = FlowActionShowTalk;
