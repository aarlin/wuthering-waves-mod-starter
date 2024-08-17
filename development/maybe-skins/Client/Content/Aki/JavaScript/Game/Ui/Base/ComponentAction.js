"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComponentAction = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	List_1 = require("../../../Core/Container/List");
var EComponentState, EActionCommandType;
!(function (t) {
	(t[(t.Register = 0)] = "Register"),
		(t[(t.Creating = 1)] = "Creating"),
		(t[(t.Create = 2)] = "Create"),
		(t[(t.Starting = 3)] = "Starting"),
		(t[(t.Start = 4)] = "Start"),
		(t[(t.Showing = 5)] = "Showing"),
		(t[(t.Show = 6)] = "Show"),
		(t[(t.Hiding = 7)] = "Hiding"),
		(t[(t.Hide = 8)] = "Hide"),
		(t[(t.Destroying = 9)] = "Destroying"),
		(t[(t.Destroy = 10)] = "Destroy");
})((EComponentState = EComponentState || {})),
	(function (t) {
		(t[(t.Default = 0)] = "Default"),
			(t[(t.Start = 1)] = "Start"),
			(t[(t.Show = 2)] = "Show"),
			(t[(t.Hide = 3)] = "Hide"),
			(t[(t.Destroy = 4)] = "Destroy");
	})((EActionCommandType = EActionCommandType || {}));
class ComponentAction {
	constructor() {
		(this.ComponentId = 0),
			(this.p1r = EComponentState.Register),
			(this.WaitToDestroy = !1),
			(this.DeadPromise = new CustomPromise_1.CustomPromise()),
			(this.v1r = new List_1.default({
				ActionCommand: EActionCommandType.Default,
				Processed: !0,
			})),
			(this.ComponentId = ++ComponentAction.M1r);
	}
	get IsRegister() {
		return this.p1r === EComponentState.Register;
	}
	get IsCreating() {
		return this.p1r === EComponentState.Creating;
	}
	get IsCreate() {
		return this.p1r === EComponentState.Create;
	}
	get IsCreateOrCreating() {
		return this.IsCreating || this.IsCreate;
	}
	get IsStarting() {
		return this.p1r === EComponentState.Starting;
	}
	get IsStart() {
		return this.p1r === EComponentState.Start;
	}
	get IsStartOrStarting() {
		return this.IsStarting || this.IsStart;
	}
	get IsShowing() {
		return this.p1r === EComponentState.Showing;
	}
	get IsShow() {
		return this.p1r === EComponentState.Show;
	}
	get IsShowOrShowing() {
		return this.IsShowing || this.IsShow;
	}
	get IsHiding() {
		return this.p1r === EComponentState.Hiding;
	}
	get IsHide() {
		return this.p1r === EComponentState.Hide;
	}
	get IsHideOrHiding() {
		return this.IsHiding || this.IsHide;
	}
	get IsDestroying() {
		return this.p1r === EComponentState.Destroying;
	}
	get IsDestroy() {
		return this.p1r === EComponentState.Destroy;
	}
	get IsDestroyOrDestroying() {
		return this.IsDestroy || this.IsDestroying;
	}
	get IsBusy() {
		return (
			this.IsCreating ||
			this.IsStarting ||
			this.IsShowing ||
			this.IsHiding ||
			this.IsDestroying
		);
	}
	async CreateAsync() {
		if (this.IsCreateOrCreating)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"UiCore",
					17,
					"Enter CreateAsync failed, Duplicate call",
					["ComponentState", EComponentState[this.p1r]],
					["ComponentName", this.constructor.name],
					["ComponentId", this.ComponentId],
				);
		else {
			if (!this.IsRegister)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"Enter CreateAsync failed",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					!1
				);
			if (
				((this.p1r = EComponentState.Creating),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter CreateAsync Creating",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					),
				!(await this.OnCreateAsyncImplement()))
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"Creating failed",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					!1
				);
			(this.p1r = EComponentState.Create),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter CreateAsync Create",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					);
		}
		return !0;
	}
	async StartAsync() {
		var t;
		return (
			!!this.S1r(EActionCommandType.Start) ||
			((t = await this.E1r()), this.y1r(), t)
		);
	}
	async E1r() {
		if (this.IsStartOrStarting)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"UiCore",
					17,
					"Enter StartAsyncImplement failed, Duplicate call",
					["ComponentState", EComponentState[this.p1r]],
					["ComponentName", this.constructor.name],
					["ComponentId", this.ComponentId],
				);
		else {
			if (!this.IsCreate)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"Enter StartAsyncImplement failed",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					!1
				);
			(this.p1r = EComponentState.Starting),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter StartAsyncImplement Starting",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					),
				await this.OnStartAsyncImplement(),
				(this.p1r = EComponentState.Start),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter StartAsyncImplement Start",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					);
		}
		return !0;
	}
	async ShowAsync() {
		var t;
		return (
			!!this.S1r(EActionCommandType.Show) ||
			((t = await this.I1r()), this.y1r(), t)
		);
	}
	async I1r() {
		if (this.IsShowOrShowing)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"UiCore",
					17,
					"Enter ShowAsyncImplement failed, Duplicate call",
					["ComponentState", EComponentState[this.p1r]],
					["ComponentName", this.constructor.name],
					["ComponentId", this.ComponentId],
				);
		else {
			if (!this.IsStartOrStarting && !this.IsHideOrHiding)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"Enter ShowAsyncImplement failed",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					!1
				);
			(this.p1r = EComponentState.Showing),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter ShowAsyncImplement Showing",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					),
				await this.OnShowAsyncImplement(),
				(this.p1r = EComponentState.Show),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter ShowAsyncImplement Show",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					);
		}
		return !0;
	}
	async HideAsync() {
		var t;
		return (
			!!this.S1r(EActionCommandType.Hide) ||
			((t = await this.T1r()), this.y1r(), t)
		);
	}
	async T1r() {
		if (this.IsHideOrHiding)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"UiCore",
					17,
					"Enter HideAsyncImplement failed, Duplicate call",
					["ComponentState", EComponentState[this.p1r]],
					["ComponentName", this.constructor.name],
					["ComponentId", this.ComponentId],
				);
		else {
			if (!this.IsStartOrStarting && !this.IsShowOrShowing)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"Enter HideAsyncImplement failed",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					!1
				);
			(this.p1r = EComponentState.Hiding),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter HideAsyncImplement Hiding",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					),
				await this.OnHideAsyncImplement(),
				(this.p1r = EComponentState.Hide),
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter HideAsyncImplement Hide",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					);
		}
		return !0;
	}
	async DestroyAsync() {
		var t;
		return (
			(this.WaitToDestroy = !0),
			this.v1r.RemoveAllNodeWithoutHead(),
			!!this.S1r(EActionCommandType.Destroy) ||
				((t = await this.L1r()), this.v1r.RemoveAllNodeWithoutHead(), t)
		);
	}
	async CloseMeAsync() {
		return this.DestroyAsync();
	}
	async L1r() {
		if (this.IsDestroyOrDestroying)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"UiCore",
					17,
					"Enter DestroyAsyncImplement failed, Duplicate call",
					["ComponentState", EComponentState[this.p1r]],
					["ComponentName", this.constructor.name],
					["ComponentId", this.ComponentId],
				);
		else
			try {
				this.IsShowOrShowing && (await this.T1r()),
					(this.WaitToDestroy = !1),
					ComponentAction.OpenLog &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"UiCore",
							17,
							"Enter DestroyAsyncImplement Destroying",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					(this.p1r = EComponentState.Destroying),
					await this.OnDestroyAsyncImplement(),
					(this.p1r = EComponentState.Destroy),
					ComponentAction.OpenLog &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"UiCore",
							17,
							"Enter DestroyAsyncImplement Destroy",
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Game",
							17,
							"Enter DestroyAsyncImplement Error",
							t,
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Game",
							17,
							"Enter DestroyAsyncImplement Exception",
							["error", t],
						);
			} finally {
				ComponentAction.OpenLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"Enter DestroyAsyncImplement Dead",
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					),
					this.DeadPromise.IsFulfilled() || this.DeadPromise.SetResult();
			}
		return !0;
	}
	Show(t = void 0) {
		this.ShowAsync().then(t);
	}
	Hide(t = void 0) {
		this.HideAsync().then(t);
	}
	Destroy(t = void 0) {
		this.DestroyAsync().then(t);
	}
	async OnCreateAsyncImplement() {
		return Promise.resolve(!0);
	}
	async OnStartAsyncImplement() {}
	async OnShowAsyncImplement() {}
	async OnHideAsyncImplement() {}
	async OnDestroyAsyncImplement() {}
	static D1r(t, e) {
		return (
			t === e ||
			(t === EActionCommandType.Show && e === EActionCommandType.Hide) ||
			(t === EActionCommandType.Hide && e === EActionCommandType.Show)
		);
	}
	R1r() {
		switch (this.p1r) {
			case EComponentState.Starting:
				return EActionCommandType.Start;
			case EComponentState.Showing:
				return EActionCommandType.Show;
			case EComponentState.Hiding:
				return EActionCommandType.Hide;
			case EComponentState.Destroying:
				return EActionCommandType.Destroy;
			default:
				return EActionCommandType.Default;
		}
	}
	S1r(t) {
		var e, o;
		return (
			!!this.IsBusy &&
			(this.R1r() === t
				? (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"UiCore",
							17,
							"[TryCacheAction] is same with current action",
							["actionType", EActionCommandType[t]],
							["ComponentState", EComponentState[this.p1r]],
							["ComponentName", this.constructor.name],
							["ComponentId", this.ComponentId],
						),
					!1)
				: ((o = (e = this.v1r.TailNode).Element.ActionCommand) ===
					EActionCommandType.Destroy
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"UiCore",
								17,
								"[TryCacheAction] tailActionType is Destroy, not allow to cache any action",
								["actionType", EActionCommandType[t]],
								["ComponentState", EComponentState[this.p1r]],
								["ComponentName", this.constructor.name],
								["ComponentId", this.ComponentId],
							)
						: (ComponentAction.D1r(o, t) &&
								(Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"UiCore",
										17,
										"[TryCacheAction] remove tail action which is pair with this action",
										["actionType", EActionCommandType[t]],
										["tailActionType", EActionCommandType[o]],
										["ComponentState", EComponentState[this.p1r]],
										["ComponentName", this.constructor.name],
										["ComponentId", this.ComponentId],
									),
								this.v1r.RemoveNode(e)),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"UiCore",
									17,
									"[TryCacheAction] done",
									["actionType", EActionCommandType[t]],
									[
										"tailActionType",
										EActionCommandType[this.v1r.TailNode.Element.ActionCommand],
									],
									["ComponentState", EComponentState[this.p1r]],
									["ComponentName", this.constructor.name],
									["ComponentId", this.ComponentId],
								),
							this.v1r.AddTail({ ActionCommand: t, Processed: !1 })),
					!0))
		);
	}
	async y1r() {
		let t = this.v1r.GetHeadNextNode();
		for (; void 0 !== t && !t.Element.Processed; ) {
			var e = t.Element.ActionCommand;
			switch (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"UiCore",
						17,
						"[ExecuteCachedActions]",
						["actionType", EActionCommandType[e]],
						["ComponentState", EComponentState[this.p1r]],
						["ComponentName", this.constructor.name],
						["ComponentId", this.ComponentId],
					),
				e)
			) {
				case EActionCommandType.Start:
					await this.E1r();
					break;
				case EActionCommandType.Show:
					await this.I1r();
					break;
				case EActionCommandType.Hide:
					await this.T1r();
					break;
				case EActionCommandType.Destroy:
					await this.L1r();
			}
			(t.Element.Processed = !0),
				void 0 === (t = t.Next) && (t = this.v1r.GetHeadNextNode());
		}
		this.v1r.RemoveAllNodeWithoutHead();
	}
	OnStartImplementCompatible() {}
	OnShowImplementCompatible() {}
	OnHideImplementCompatible() {}
	OnDestroyImplementCompatible() {}
	StartCompatible() {
		(this.p1r = EComponentState.Starting),
			this.OnStartImplementCompatible(),
			(this.p1r = EComponentState.Start);
	}
	ShowCompatible() {
		(this.p1r = EComponentState.Showing),
			this.OnShowImplementCompatible(),
			(this.p1r = EComponentState.Show);
	}
	HideCompatible() {
		(this.p1r = EComponentState.Hiding),
			this.OnHideImplementCompatible(),
			(this.p1r = EComponentState.Hide);
	}
	DestroyCompatible() {
		this.IsShowOrShowing && this.HideCompatible(),
			(this.p1r = EComponentState.Destroying),
			this.OnDestroyImplementCompatible(),
			(this.p1r = EComponentState.Destroy),
			this.DeadPromise.SetResult();
	}
}
((exports.ComponentAction = ComponentAction).OpenLog = !0),
	(ComponentAction.M1r = 0);
