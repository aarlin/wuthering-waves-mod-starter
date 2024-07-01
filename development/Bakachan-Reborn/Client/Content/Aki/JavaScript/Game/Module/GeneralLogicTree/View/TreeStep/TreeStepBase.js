"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TreeStepBase = void 0);
const ue_1 = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
	QuestUtil_1 = require("../../../QuestNew/QuestUtil"),
	GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController");
class TreeStepBase extends UiComponentsAction_1.UiComponentsAction {
	constructor() {
		super(...arguments),
			(this.DescribeTextComp = void 0),
			(this.DistanceTextComp = void 0),
			(this.TreeIncId = BigInt(0)),
			(this.Config = void 0),
			(this.bct = () => {
				var e =
					GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleText(
						this.TreeIncId,
						this.Config,
					);
				return (
					this.OnStepDescribeUpdate(e),
					StringUtils_1.StringUtils.IsBlank(e)
						? (this.DescribeTextComp.SetUIActive(!1), !1)
						: (this.DescribeTextComp.SetText(e),
							this.DescribeTextComp.SetUIActive(!0),
							!0)
				);
			}),
			(this.UpdateDistanceText = () => {
				if (
					!GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowTrackDistance(
						this.TreeIncId,
						this.Config,
					)
				)
					return this.DistanceTextComp.SetUIActive(!1), !1;
				if (
					!(e =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							this.TreeIncId,
						))
				)
					return this.DistanceTextComp.SetUIActive(!1), !1;
				if (e.IsInTrackRange()) this.DistanceTextComp.SetUIActive(!1);
				else {
					var e,
						t =
							GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleTrackNodeId(
								this.Config,
							);
					if (!(e = e.GetNodeTrackPosition(t)))
						return this.DistanceTextComp.SetUIActive(!1), !1;
					if (
						!QuestUtil_1.QuestUtil.SetTrackDistanceText(
							this.DistanceTextComp,
							e,
						)
					)
						return this.DistanceTextComp.SetUIActive(!1), !1;
					this.DistanceTextComp.SetUIActive(!0);
				}
				return !0;
			});
	}
	Init(e) {
		this.SetRootActor(e.GetOwner(), !0);
	}
	Dispose() {
		this.DescribeTextComp?.OnSelfLanguageChange.Unbind();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, ue_1.UIText],
			[1, ue_1.UIText],
		];
	}
	OnStart() {
		(this.DescribeTextComp = this.GetText(0)),
			this.DescribeTextComp.OnSelfLanguageChange.Bind(this.bct),
			(this.DistanceTextComp = this.GetText(1)),
			this.DistanceTextComp.SetUIActive(!0);
	}
	UpdateData(e, t) {
		return (
			(this.TreeIncId = e),
			(this.Config = t),
			this.Config && this.TreeIncId !== BigInt(0)
				? this.UpdateStepInfo()
				: (this.DescribeTextComp.SetUIActive(!1),
					this.DistanceTextComp.SetUIActive(!1),
					!1)
		);
	}
	UpdateStepInfo() {
		var e = this.bct();
		return this.UpdateDistanceText(), e;
	}
	OnStepDescribeUpdate(e) {}
}
exports.TreeStepBase = TreeStepBase;
