"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericPromptModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Queue_1 = require("../../../Core/Container/Queue"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager");
class GenericPromptModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.j$t = new Queue_1.Queue()),
			(this.W$t = () => {
				for (let e = 0, t = this.j$t.Size; e < t; ++e)
					this.ApplyPromptParamHub(this.j$t.Pop());
				this.j$t.Empty ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GenericPrompt",
							11,
							"播放队列飘字异常,存在从队列中取出又被放回队列的情况",
						));
			});
	}
	OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFinishLoadingState,
				this.W$t,
			),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFinishLoadingState,
				this.W$t,
			),
			this.j$t.Clear(),
			!0
		);
	}
	K$t() {
		return (
			ModelManager_1.ModelManager.LoadingModel.IsLoading ||
			ModelManager_1.ModelManager.LoginModel.HasLoginPromise()
		);
	}
	ApplyPromptParamHub(e) {
		this.K$t()
			? this.j$t.Push(e)
			: EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.InsertFloatTips,
					e,
				);
	}
}
exports.GenericPromptModel = GenericPromptModel;
