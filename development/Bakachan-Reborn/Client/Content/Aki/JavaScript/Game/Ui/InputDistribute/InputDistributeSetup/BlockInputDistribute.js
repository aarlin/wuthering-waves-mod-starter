"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlockInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CameraController_1 = require("../../../Camera/CameraController"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackScreenFadeController_1 = require("../../../Module/BlackScreen/BlackScreenFadeController"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class BlockInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		var t;
		return this.aXe() &&
			ModelManager_1.ModelManager.SeamlessTravelModel.InSeamlessTraveling
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Input",
						8,
						"[InputDistribute]无缝加载过渡场景中，只允许角色移动输入",
					),
				this.SetInputDistributeTag(
					InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
						.AxisInput.MoveInputTag,
				),
				!0)
			: this.aXe()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Input",
							8,
							"[InputDistribute]加载中设置输入分发tag为 MouseInputTag NavigationTag",
						),
					this.SetInputDistributeTags([
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.MouseInputTag,
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.NavigationTag,
					]),
					!0)
				: this.Pmr()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]断线中，则设置输入分发tag为 BlockAllInputTag",
							),
						this.SetInputDistributeTag(
							InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
						),
						!0)
					: this.xmr()
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Input",
									18,
									"[InputDistribute]战斗结算中设置输入分发tag为 BlockAllInputTag",
								),
							this.SetInputDistributeTag(
								InputDistributeDefine_1.inputDistributeTagDefine
									.BlockAllInputTag,
							),
							!0)
						: this.wmr()
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Input",
										46,
										"[InputDistribute]黑幕中，则设置输入分发tag为 MouseInputTag",
									),
								this.SetInputDistributeTag(
									InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
										.MouseInputTag,
								),
								!0)
							: CameraController_1.CameraController.IsSequenceCameraInCinematic()
								? (Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Input",
											8,
											"[InputDistribute]玩家角色在播放处决中，大招中等镜头时，只允许角色技能输入，设置输入分发tag为 CharacterSkillInputTag",
										),
									this.SetInputDistributeTag(
										InputDistributeDefine_1.inputDistributeTagDefine
											.FightInputRoot.ActionInput.CharacterSkillInputTag,
									),
									!0)
								: ModelManager_1.ModelManager.MapModel?.IsInUnopenedAreaPullback()
									? (Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Input",
												8,
												"[InputDistribute]角色进入未开放区域启动拉回，设置输入分发tag为 MouseInputTag",
											),
										this.SetInputDistributeTag(
											InputDistributeDefine_1.inputDistributeTagDefine
												.UiInputRoot.MouseInputTag,
										),
										!0)
									: (t =
												ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
													185,
												)) && t.HasTag(191377386)
										? (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"Input",
													8,
													"[InputDistribute]角色落水中，则设置输入分发tag为 MouseInputTag",
												),
											this.SetInputDistributeTag(
												InputDistributeDefine_1.inputDistributeTagDefine
													.UiInputRoot.MouseInputTag,
											),
											!0)
										: ModelManager_1.ModelManager.MenuModel?.IsWaitForKeyInput
											? (Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"Input",
														8,
														"[InputDistribute]玩家设置按键中，则设置输入分发tag为 NavigationTag",
													),
												this.SetInputDistributeTags([
													InputDistributeDefine_1.inputDistributeTagDefine
														.UiInputRoot.NavigationTag,
													InputDistributeDefine_1.inputDistributeTagDefine
														.UiInputRoot.MouseInputTag,
												]),
												!0)
											: !!ModelManager_1.ModelManager.GeneralLogicTreeModel
													.DisableInput &&
												(Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"Input",
														8,
														"[InputDistribute]行为配置禁用输入 设置输入分发tag为 BlockAllInputTag",
													),
												this.SetInputDistributeTag(
													InputDistributeDefine_1.inputDistributeTagDefine
														.BlockAllInputTag,
												),
												!0);
	}
	aXe() {
		return ModelManager_1.ModelManager.LoadingModel.IsLoading;
	}
	Pmr() {
		return (
			1 === ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus()
		);
	}
	wmr() {
		return BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis;
	}
	xmr() {
		return ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement;
	}
}
exports.BlockInputDistribute = BlockInputDistribute;
