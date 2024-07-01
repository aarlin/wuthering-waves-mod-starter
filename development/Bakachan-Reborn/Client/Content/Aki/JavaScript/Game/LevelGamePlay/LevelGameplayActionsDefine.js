"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActionInteractFan =
		exports.ActionTimeTrackControl =
		exports.ActionBtGm =
		exports.ActionOpenAdvice =
		exports.ActionPlotChangeRole =
		exports.ActionPickupDropItem =
		exports.ActionBubbleData =
		exports.ActionPlayBubble =
		exports.ActionEnterSequenceCamera =
		exports.ActionPlotInterludeAction =
		exports.ActionSetSeqCameraTransform =
		exports.ActionSetNpcPosition =
		exports.EntityPositionData =
		exports.ActionMoveToLocation =
		exports.ActionDeliverQuestBehavior =
		exports.ActionSubmitQuestBehavior =
		exports.ActionSendGameplayEvent =
		exports.ActionCaptureRequest =
		exports.ActionExecution =
		exports.CommonInteractOption =
		exports.optionTypeLogString =
		exports.CommonInteractActions =
		exports.CommonActionInfo =
			void 0);
const IAction_1 = require("../../UniverseEditor/Interface/IAction"),
	LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
class CommonActionInfo {
	constructor() {
		(this.Name = void 0), (this.Params = void 0), (this.ActionGuid = void 0);
	}
}
exports.CommonActionInfo = CommonActionInfo;
class CommonInteractActions {
	constructor() {
		(this.Actions = void 0), (this.Type = "Actions");
	}
}
(exports.CommonInteractActions = CommonInteractActions),
	(exports.optionTypeLogString = {
		0: "基础交互",
		1: "动态交互",
		2: "随机交互",
	});
class CommonInteractOption {
	constructor() {
		(this.Type = void 0),
			(this.Icon = void 0),
			(this.DoIntactType = void 0),
			(this.Range = 0),
			(this.Context = void 0),
			(this.InstanceId = 0),
			(this.OptionType = 0),
			(this.ContentType = 0),
			(this.CustomOptionType = 0),
			(this.Disabled = !1),
			(this.IsUniqueness = !1),
			(this.UniequenessType = IAction_1.EInteractUniqueness.Closest),
			(this.OptionContentId = 0),
			(this.SortWeight = 0);
	}
	Init(t, o, e, i, n, s, c = 0, r = 0) {
		(this.InstanceId = t),
			(this.Guid = o.Guid),
			(this.Type = o.Type),
			(this.Icon = o.Icon),
			(this.TidContent = o.TidContent),
			(this.Condition = o.Condition),
			(this.Context = LevelGeneralContextDefine_1.GeneralContext.Copy(e)),
			(this.Range = i),
			(this.DoIntactType = n),
			(this.OptionType = s),
			(this.CustomOptionType = c),
			(this.ContentType = r),
			o.UniquenessTest
				? ((this.IsUniqueness = !0), (this.UniequenessType = o.UniquenessTest))
				: (this.IsUniqueness = !1);
	}
	Dispose() {
		this.Context && (this.Context.Release(), (this.Context = void 0)),
			(this.Condition = void 0),
			(this.TidContent = void 0);
	}
}
exports.CommonInteractOption = CommonInteractOption;
class ActionExecution {
	constructor() {
		this.SuccessEvent = void 0;
	}
}
exports.ActionExecution = ActionExecution;
class ActionCaptureRequest {
	constructor() {
		this.SuccessEvent = void 0;
	}
}
exports.ActionCaptureRequest = ActionCaptureRequest;
class ActionSendGameplayEvent {
	constructor() {
		(this.Tag = void 0), (this.Both = !1);
	}
}
exports.ActionSendGameplayEvent = ActionSendGameplayEvent;
class ActionSubmitQuestBehavior {
	constructor() {
		this.Callback = void 0;
	}
}
exports.ActionSubmitQuestBehavior = ActionSubmitQuestBehavior;
class ActionDeliverQuestBehavior {
	constructor() {
		(this.Items = void 0), (this.DescText = ""), (this.EntityId = 0);
	}
}
exports.ActionDeliverQuestBehavior = ActionDeliverQuestBehavior;
class ActionMoveToLocation {
	constructor() {
		(this.ToLocation = void 0),
			(this.MoveState = 0),
			(this.IsNavigation = !1),
			(this.IsFly = !1),
			(this.DebugMode = !1),
			(this.MoveSpeed = 0);
	}
}
exports.ActionMoveToLocation = ActionMoveToLocation;
class EntityPositionData {
	constructor(t, o) {
		(this.EntityId = t), (this.Pos = o);
	}
}
exports.EntityPositionData = EntityPositionData;
class ActionSetNpcPosition {
	constructor() {
		(this.EntityData = void 0), (this.IsCenterPosition = !0);
	}
}
exports.ActionSetNpcPosition = ActionSetNpcPosition;
class ActionSetSeqCameraTransform {
	constructor() {
		this.Transform = void 0;
	}
}
exports.ActionSetSeqCameraTransform = ActionSetSeqCameraTransform;
class ActionPlotInterludeAction {
	constructor() {
		(this.FadeInTime = 0), (this.FadeOutTime = 0), (this.ActionList = void 0);
	}
}
exports.ActionPlotInterludeAction = ActionPlotInterludeAction;
class ActionEnterSequenceCamera {
	constructor() {
		this.ShouldEnter = !1;
	}
}
exports.ActionEnterSequenceCamera = ActionEnterSequenceCamera;
class ActionPlayBubble {
	constructor() {
		(this.Condition = void 0), (this.Flow = void 0);
	}
}
exports.ActionPlayBubble = ActionPlayBubble;
class ActionBubbleData {
	constructor() {
		(this.FlowIndex = { FlowListName: "", FlowId: 0 }), (this.WaitTime = 0);
	}
}
exports.ActionBubbleData = ActionBubbleData;
class ActionPickupDropItem {
	constructor() {
		this.EntityId = 0;
	}
}
exports.ActionPickupDropItem = ActionPickupDropItem;
class ActionPlotChangeRole {
	constructor() {
		this.Enable = !1;
	}
}
exports.ActionPlotChangeRole = ActionPlotChangeRole;
class ActionOpenAdvice {
	constructor() {
		this.EntityId = 0;
	}
}
exports.ActionOpenAdvice = ActionOpenAdvice;
class ActionBtGm {
	constructor() {
		this.ActualEventType = "";
	}
}
exports.ActionBtGm = ActionBtGm;
class ActionTimeTrackControl {
	constructor() {
		(this.EntityId = 0), (this.ConfigIndex = 0);
	}
}
exports.ActionTimeTrackControl = ActionTimeTrackControl;
class ActionInteractFan {
	constructor() {
		this.EntityId = 0;
	}
}
exports.ActionInteractFan = ActionInteractFan;
