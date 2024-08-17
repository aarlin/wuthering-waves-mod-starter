"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreateCharacterView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	TextInputComponent_1 = require("../../Common/InputView/View/TextInputComponent"),
	LoginDefine_1 = require("../../Login/Data/LoginDefine"),
	LoginController_1 = require("../../Login/LoginController"),
	UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager");
class CreateCharacterView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.iOt = void 0),
			(this.oOt = !1),
			(this.rOt = []),
			(this.nOt = []),
			(this.sOt = void 0),
			(this.aOt = () => {
				this.hOt(LoginDefine_1.ELoginSex.Boy);
			}),
			(this.lOt = () => {
				this.hOt(LoginDefine_1.ELoginSex.Girl);
			}),
			(this._Ot = () => {
				this.sOt.SetActive(!1);
			}),
			(this.uOt = () => {
				this.cOt();
			}),
			(this.mOt = async (e) => (
				this.GetItem(3).SetUIActive(!1),
				ModelManager_1.ModelManager.LoginModel.SetPlayerSex(this.iOt),
				ModelManager_1.ModelManager.LoginModel.SetPlayerName(e),
				LoginController_1.LoginController.CreateCharacterRequest()
			)),
			(this.dOt = (e) => {
				e
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 11, "创角界面请求创角成功"),
						ModelManager_1.ModelManager.LoginModel.CreateLoginPromise(),
						LoginController_1.LoginController.HandleLoginGame(!1, e).then(
							(e) => {
								LoginController_1.LoginController.DisConnect(e),
									e
										? (this.COt(),
											this.GetItem(3).SetUIActive(!1),
											UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(
												this.rOt[this.iOt],
												17,
											),
											UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
												this.gOt(),
												() => {
													this.CloseMe();
												},
											))
										: LoginController_1.LoginController.CreateCharacterViewToLoginView();
							},
						))
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 11, "创角界面请求创角失败"),
						this.sOt.ClearText(),
						this.GetItem(3).SetUIActive(!0));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.aOt],
				[2, this.lOt],
			]);
	}
	hOt(e) {
		var t;
		this.iOt !== e &&
			((t = this.iOt),
			(this.iOt = e),
			this.GetItem(3).SetUIActive(!1),
			this.GetItem(4).SetUIActive(!1),
			this.oOt
				? (this.COt(),
					UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
						this.fOt(),
						() => {
							this.pOt();
						},
					),
					this.nOt[t].RemoveRoleChooseRenderingMaterial())
				: UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
						this.vOt(),
						() => {
							this.pOt();
						},
					),
			this.nOt[e].SetRoleChooseRenderingMaterial());
	}
	fOt() {
		return this.iOt === LoginDefine_1.ELoginSex.Boy
			? "LevelSequence_SwitchMale"
			: "LevelSequence_SwitchFemale";
	}
	vOt() {
		return this.iOt === LoginDefine_1.ELoginSex.Boy
			? "LevelSequence_SelectMale"
			: "LevelSequence_SelectFemale";
	}
	pOt() {
		(this.oOt = !0),
			this.GetItem(3)?.SetUIActive(!0),
			this.GetButton(1).RootUIComp.SetUIActive(
				this.iOt !== LoginDefine_1.ELoginSex.Boy,
			),
			this.GetButton(2).RootUIComp.SetUIActive(
				this.iOt !== LoginDefine_1.ELoginSex.Girl,
			);
	}
	OnStart() {
		this.UiViewSequence.AddSequenceFinishEvent("hide", this._Ot),
			(this.rOt =
				ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()),
			this.MOt(),
			this.SOt(),
			this.COt(!1),
			this.GetItem(3).SetUIActive(!0),
			this.GetItem(4).SetUIActive(!0);
	}
	OnAfterDestroy() {
		ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CreateRoleShowInputName,
			this.uOt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CreateRoleShowInputName,
			this.uOt,
		);
	}
	MOt() {
		var e = {
			ConfirmFunc: this.mOt,
			ResultFunc: this.dOt,
			InputText: "",
			IsCheckNone: !0,
		};
		this.sOt = new TextInputComponent_1.TextInputComponent(this.GetItem(0), e);
	}
	SOt() {
		var e;
		(e =
			((e = new GenderButton(
				this.GetButton(2),
				this.rOt[LoginDefine_1.ELoginSex.Girl],
			)).BindFunction(),
			this.nOt.push(e),
			new GenderButton(
				this.GetButton(1),
				this.rOt[LoginDefine_1.ELoginSex.Boy],
			))).BindFunction(),
			this.nOt.push(e);
	}
	OnBeforeDestroy() {
		for (const e of this.nOt)
			e.RemoveRoleChooseRenderingMaterial(), e.UnbindFunction();
		this.sOt.Destroy();
	}
	cOt() {
		this.UiViewSequence.PlaySequence("show"), this.sOt.SetActive(!0);
	}
	COt(e = !0) {
		e ? this.UiViewSequence.PlaySequence("hide", !0) : this.sOt.SetActive(!1);
	}
	gOt() {
		return this.iOt === LoginDefine_1.ELoginSex.Boy
			? "LevelSequence_MaleTurnHead"
			: "LevelSequence_FemaleTurnHead";
	}
}
exports.CreateCharacterView = CreateCharacterView;
class GenderButton {
	constructor(e, t) {
		(this.EOt = void 0),
			(this.yOt = void 0),
			(this.IOt = void 0),
			(this.TOt = void 0),
			(this.VCt = void 0),
			(this.zke = void 0),
			(this.LOt = () => {
				this.RemoveRoleRenderingMaterial(),
					(this.EOt =
						UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(
							this.zke,
							"CreateCharacterMaterialController",
						)),
					(this.yOt =
						UiLoginSceneManager_1.UiLoginSceneManager.SetHuluRenderingMaterial(
							this.zke,
							"CreateCharacterMaterialController",
						));
			}),
			(this.RemoveRoleRenderingMaterial = () => {
				void 0 !== this.EOt &&
					(UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterialWithEnding(
						this.zke,
						this.EOt,
					),
					(this.EOt = void 0)),
					void 0 !== this.yOt &&
						(UiLoginSceneManager_1.UiLoginSceneManager.RemoveHuluRenderingMaterialWithEnding(
							this.zke,
							this.yOt,
						),
						(this.yOt = void 0));
			}),
			(this.VCt = e),
			(this.zke = t);
	}
	BindFunction() {
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			(this.VCt.OnPointEnterCallBack.Bind(this.LOt),
			this.VCt.OnPointExitCallBack.Bind(this.RemoveRoleRenderingMaterial));
	}
	SetRoleChooseRenderingMaterial() {
		this.RemoveRoleChooseRenderingMaterial(),
			(this.IOt =
				UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(
					this.zke,
					"ChooseCharacterMaterialController",
				)),
			(this.TOt =
				UiLoginSceneManager_1.UiLoginSceneManager.SetHuluRenderingMaterial(
					this.zke,
					"ChooseCharacterMaterialController",
				));
	}
	RemoveRoleChooseRenderingMaterial() {
		void 0 !== this.IOt &&
			(UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterialWithEnding(
				this.zke,
				this.IOt,
			),
			(this.IOt = void 0)),
			void 0 !== this.TOt &&
				(UiLoginSceneManager_1.UiLoginSceneManager.RemoveHuluRenderingMaterialWithEnding(
					this.zke,
					this.TOt,
				),
				(this.TOt = void 0));
	}
	UnbindFunction() {
		this.VCt.OnPointEnterCallBack.Unbind(),
			this.VCt.OnPointExitCallBack.Unbind();
	}
}
