/**
 * Created by Phil on 5/2/16.
 */

function History() {




<!-- ==================================  MODAL WINDOW ==============================  -->

    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Modal title</h4>
                </div>
                <div class="modal-body">
                  //  <p>One fine body&hellip;</p>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <!-- ===============================  HTML For History =========================  -->

    <div class="panel panel-inverse" data-sortable-id="ui-media-object-4">
        <div class="panel-heading">
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i
                    class="fa fa-expand"></i></a>
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i
                    class="fa fa-repeat"></i></a>
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i
                    class="fa fa-minus"></i></a>
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i
                    class="fa fa-times"></i></a>
            </div>
            <h4 class="panel-title">Media List with Button</h4>
        </div>
        <div class="panel-body">
            <ul class="media-list media-list-with-divider">
                <li class="media media-sm">
                    <a class="media-left" href="javascript:;">
                        <img src="assets/img/user-5.jpg" alt="" class="media-object rounded-corner"/>
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading">Bottoom One?</h4>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
                            commodo. Cras purus odio, tempus viverra turpis.</p>
                        <p>
                            <a href="javascript:;" class="btn btn-sm btn-danger m-r-5">Reject</a>
                            <a href="javascript:;" class="btn btn-sm btn-default">Cancel</a>
                        </p>
                    </div>
                </li>
                <li class="media media-sm">
                    <div class="media-body text-right">
                        <h4 class="media-heading">Nested media heading</h4>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
                            commodo. Cras purus odio, tempus viverra turpis.</p>
                        <p>
                            <a href="javascript:;" class="btn btn-sm btn-success m-r-5">Published</a>
                            <a href="javascript:;" class="btn btn-sm btn-default">Cancel</a>
                        </p>
                    </div>
                    <a class="media-right" href="javascript:;">
                        <img src="assets/img/user-6.jpg" alt="" class="media-object rounded-corner"/>
                    </a>
                </li>
                <li class="media media-sm">
                    <a class="media-left" href="javascript:;">
                        <img src="assets/img/user-8.jpg" alt="" class="media-object rounded-corner"/>
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading">Nested media heading</h4>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
                            commodo. Cras purus odio, tempus viverra turpis.</p>
                        <p>
                            <a href="javascript:;" class="btn btn-sm btn-primary m-r-5">Confirm</a>
                            <a href="javascript:;" class="btn btn-sm btn-default">Cancel</a>
                        </p>
                    </div>
                </li>
                <li class="media media-sm">
                    <div class="media-body text-right">
                        <h4 class="media-heading">Nested media heading</h4>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
                            commodo. Cras purus odio, tempus viverra turpis.</p>
                        <p>
                            <a href="javascript:;" class="btn btn-sm btn-warning m-r-5">Edit</a>
                            <a href="javascript:;" class="btn btn-sm btn-default">Cancel</a>
                        </p>
                    </div>
                    <a class="media-right" href="javascript:;">
                        <img src="assets/img/user-7.jpg" alt="" class="media-object rounded-corner"/>
                    </a>
                </li>
            </ul>
        </div>
    </div>


}